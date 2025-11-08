#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Utility functions
function findFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  
  function walk(directory) {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip common ignored directories
        if (!['node_modules', 'dist', 'build', '.git', '.next', '.turbo'].includes(item)) {
          walk(fullPath);
        }
      } else {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

function loadMigration(version) {
  const migrationPath = path.join(__dirname, 'migrations', `v${version}.js`);
  
  if (!fs.existsSync(migrationPath)) {
    throw new Error(`Migration script for v${version} not found at ${migrationPath}`);
  }
  
  try {
    return require(migrationPath);
  } catch (error) {
    throw new Error(`Failed to load migration script: ${error.message}`);
  }
}

function createBackup(targetPath) {
  const backupDir = path.join(targetPath, '.migration-backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `backup-${timestamp}.zip`);
  
  try {
    execSync(`cd "${targetPath}" && zip -r "${backupFile}" . -x "node_modules/*" ".git/*" "dist/*" "build/*"`, {
      stdio: 'pipe'
    });
    return backupFile;
  } catch (error) {
    console.warn('⚠️  Could not create backup zip, continuing without backup...');
    return null;
  }
}

// Main CLI program
program
  .name('ui-migrate')
  .description('UI Core Design System Migration Tool')
  .version('1.0.0')
  .showHelpAfterError('(add --help for additional information)');

program
  .command('run <version>')
  .description('Run migration to specific version (e.g., v1-to-v2)')
  .option('-d, --dry-run', 'Dry run - show what would change without modifying files')
  .option('-p, --path <path>', 'Path to transform (default: current directory)')
  .option('-f, --files <pattern>', 'File pattern to process (default: **/*.{js,jsx,ts,tsx})')
  .option('--no-backup', 'Skip creating backup')
  .option('--verbose', 'Show detailed output')
  .action(async (version, options) => {
    try {
      console.log(`🚀 Starting migration to ${version}...\n`);
      
      const targetPath = options.path ? path.resolve(options.path) : process.cwd();
      
      if (!fs.existsSync(targetPath)) {
        throw new Error(`Target path does not exist: ${targetPath}`);
      }
      
      // Load migration script
      const migration = loadMigration(version);
      
      // Create backup
      let backupPath = null;
      if (options.backup) {
        console.log('📦 Creating backup...');
        backupPath = createBackup(targetPath);
        if (backupPath) {
          console.log(`✅ Backup created: ${backupPath}`);
        }
      }
      
      // Find files to process
      const filePattern = options.files || '**/*.{js,jsx,ts,tsx}';
      const files = findFiles(targetPath);
      
      console.log(`📁 Found ${files.length} files to process in ${targetPath}\n`);
      
      if (options.verbose) {
        console.log('Files to process:');
        files.forEach(file => console.log(`  - ${path.relative(targetPath, file)}`));
        console.log('');
      }
      
      // Run migration
      const startTime = Date.now();
      const results = await migration.migrate({
        targetPath,
        files,
        options: {
          dryRun: options.dryRun,
          verbose: options.verbose
        }
      });
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      // Show results
      console.log('\n📊 Migration Results:');
      console.log(`   Files processed: ${results.stats.filesProcessed}`);
      console.log(`   Files modified: ${results.stats.filesModified}`);
      console.log(`   Changes made: ${results.stats.changesMade}`);
      console.log(`   Duration: ${duration}s`);
      
      if (options.dryRun) {
        console.log('\n🔍 DRY RUN COMPLETED - No files were modified');
        console.log('   Use without --dry-run to apply changes');
      } else {
        console.log('\n✅ MIGRATION COMPLETED SUCCESSFULLY!');
      }
      
      if (backupPath) {
        console.log(`💾 Backup available at: ${backupPath}`);
      }
      
      // Show summary of changes
      if (results.changes && results.changes.length > 0) {
        console.log('\n📝 Changes Summary:');
        results.changes.forEach(change => {
          console.log(`   - ${change.type}: ${change.description}`);
        });
      }
      
      console.log('\n📚 Next steps:');
      console.log('   1. Review the changes made');
      console.log('   2. Run tests to ensure everything works');
      console.log('   3. Check the migration guide for manual steps:');
      console.log(`      docs/migrations/${version}.md`);
      
    } catch (error) {
      console.error(`\n❌ Migration failed: ${error.message}`);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available migrations')
  .action(() => {
    const migrationsDir = path.join(__dirname, 'migrations');
    
    if (!fs.existsSync(migrationsDir)) {
      console.log('No migrations directory found');
      return;
    }
    
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js') && file !== 'index.js')
      .sort();
    
    if (files.length === 0) {
      console.log('No migration scripts found');
      return;
    }
    
    console.log('📦 Available Migrations:');
    files.forEach(file => {
      const version = file.replace('.js', '');
      const migration = require(path.join(migrationsDir, file));
      console.log(`   ${version} - ${migration.description || 'No description'}`);
    });
  });

program
  .command('info <version>')
  .description('Show information about a specific migration')
  .action((version) => {
    try {
      const migration = loadMigration(version);
      console.log(`📋 Migration: ${version}`);
      console.log(`📝 Description: ${migration.description || 'No description'}`);
      
      if (migration.breakingChanges) {
        console.log('\n🚨 Breaking Changes:');
        migration.breakingChanges.forEach(change => {
          console.log(`   - ${change}`);
        });
      }
      
      if (migration.manualSteps) {
        console.log('\n🔧 Manual Steps Required:');
        migration.manualSteps.forEach(step => {
          console.log(`   - ${step}`);
        });
      }
      
      console.log(`\n📚 Documentation: docs/migrations/${version}.md`);
      
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

// Error handling for unknown commands
program.showSuggestionAfterError(true);

// Parse command line arguments
program.parse();