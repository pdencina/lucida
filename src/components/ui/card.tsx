import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('rounded-lg border border-gray-200 bg-white p-5', className)}>
      {children}
    </div>
  );
}
