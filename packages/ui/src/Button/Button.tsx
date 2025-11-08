import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...props
  }, ref) => {

    const baseClasses = 'inline-flex items-center justify-center gap-2 border font-medium cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant classes với Tailwind
    const variantClasses = {
      primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus-visible:outline-blue-600',
      secondary: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus-visible:outline-gray-600',
      ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus-visible:outline-gray-600',
      danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus-visible:outline-red-600',
    };

    // Size classes với Tailwind
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-md min-h-8',
      md: 'px-4 py-2 text-sm rounded-lg min-h-10',
      lg: 'px-6 py-3 text-base rounded-lg min-h-12',
    };

    const buttonClass = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      isLoading && 'cursor-wait',
      className,

    );

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <div
              className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
            <span className="opacity-80">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;