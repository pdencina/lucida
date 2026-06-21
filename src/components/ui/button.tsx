import { clsx } from 'clsx';
import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-40',
        {
          'bg-gray-900 text-white hover:bg-gray-800': variant === 'primary',
          'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
        },
        {
          'h-7 px-2.5 text-xs': size === 'sm',
          'h-9 px-4 text-sm': size === 'md',
          'h-11 px-5 text-sm': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
