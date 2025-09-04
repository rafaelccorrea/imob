import React from 'react';
import { cn } from './utils';

// Alert Component
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export const Alert: React.FC<AlertProps> = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    destructive: 'bg-red-50 border-red-200 text-red-800',
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
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
);

type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ className, ...props }) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
);
