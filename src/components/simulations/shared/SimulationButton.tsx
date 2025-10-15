import React from 'react';
import { Loader2 } from 'lucide-react';

interface SimulationButtonProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const SimulationButton: React.FC<SimulationButtonProps> = ({
  variant,
  onClick,
  disabled = false,
  loading = false,
  children,
  icon,
  fullWidth = false,
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white hover:from-mint-600 hover:to-ocean-600',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    success: 'bg-success-600 text-white hover:bg-success-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default SimulationButton;

