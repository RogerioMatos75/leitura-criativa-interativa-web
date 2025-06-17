
import React from 'react';

const LoadingSpinner: React.FC<{ size?: string }> = ({ size = 'w-12 h-12' }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <div 
        className={`animate-spin rounded-full ${size} border-t-4 border-b-4 border-sky-500`}
        role="status"
        aria-label="Carregando..."
      >
      </div>
    </div>
  );
};

export default LoadingSpinner;
