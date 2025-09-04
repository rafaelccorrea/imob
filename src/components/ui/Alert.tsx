import React from 'react';
import { cn } from './utils';

// Alert Component
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export const Alert: React.FC<AlertProps> = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    destructive: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  };

  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

type AlertTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertTitle: React.FC<AlertTitleProps> = ({ className, ...props }) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight text-gray-900 dark:text-gray-100', className)} {...props} />
);

type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ className, ...props }) => (
  <div className={cn('text-sm [&_p]:leading-relaxed text-gray-700 dark:text-gray-300', className)} {...props} />
);
