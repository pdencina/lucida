import { clsx } from 'clsx';
import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-[13px] font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          'block w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-150',
          'placeholder:text-gray-400',
          'focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100',
          error ? 'border-red-300' : 'border-gray-200',
          className
        )}
        {...props}
      />
      {error && <p className="text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
