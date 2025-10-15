import React from 'react';

interface StepContainerProps {
  title?: string;
  children: React.ReactNode;
}

const StepContainer: React.FC<StepContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default StepContainer;

