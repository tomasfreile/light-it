import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50';
  
  const variants = {
    primary: 'flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 px-4 py-2',
    secondary: 'border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 px-4 py-2',
    icon: 'inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
      ) : children}
    </button>
  );
}; 