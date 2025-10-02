Epic 1. Setup Monorepo (Turborepo)

Task 1. Init monorepo bằng create-turbo@latest.

Task 2. Tạo 2 apps:

web (Next.js, user-facing).

admin (Next.js, dashboard).

Task 3. Tạo 3 packages:

ui (shared UI components).

utils (date, format, validations).

api (API client, axios instance).

Task 4. Setup build pipeline (tsup hoặc rollup) cho packages.

Epic 2. Package Boundaries

Task 1. Quy ước cấu trúc repo:

apps/
web/
admin/
packages/
ui/
utils/
api/

Task 2. Định nghĩa rule:

apps → được phép dùng ui, utils, api.

packages → chỉ được import package trong packages, không import apps.

Task 3. Viết eslint rule (eslint-plugin-boundaries hoặc import/no-restricted-paths) để enforce.

Task 4. Tạo index.ts làm public API cho từng package.

Epic 3. Versioning Strategy

Task 1. Setup Changesets để quản lý version.

Task 2. Áp dụng unified versioning (tất cả packages share 1 version).

Task 3. Switch sang independent versioning (mỗi package có version riêng).

Task 4. Thử release 1 package (utils) mà không ảnh hưởng package khác.

Epic 4. CI/CD & Caching

Task 1. Setup GitHub Actions để chạy build + test cho tất cả apps/packages.

Task 2. Bật Turborepo remote caching (Vercel hoặc custom S3).

Task 3. Demo incremental build (chỉ build package thay đổi).

Epic 5. Documentation

Task 1. Viết RFC ngắn: mô tả boundaries, versioning, rule enforce.

Task 2. Tạo diagram dependency graph (có thể dùng madge để visualize).

Task 3. Ghi lại ưu/nhược điểm của Turborepo so với Nx.

👉 Sau khi hoàn thành, bạn sẽ có:

Một repo monorepo chuẩn enterprise với Turborepo.

Eslint enforce boundaries.

Versioning strategy (unified + independent).

CI/CD caching demo.

RFC doc để thể hiện tư duy system design.
