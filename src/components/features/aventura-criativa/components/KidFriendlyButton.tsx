
import React from 'react';

interface KidFriendlyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const KidFriendlyButton: React.FC<KidFriendlyButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className, 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 transform transition-all duration-150 ease-in-out";
  
  const variantStyles = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 focus:ring-yellow-300",
    secondary: "bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-300"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default KidFriendlyButton;
