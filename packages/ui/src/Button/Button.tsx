import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn--primary',
  secondary: 'btn--secondary'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg'
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className,
    children,
    ...props
  }, ref) => {

    const buttonClass = clsx(
      'btn',
      variantClasses[variant],
      sizeClasses[size],
      isLoading && 'cursor-wait',
      className
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
            <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading</span>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;