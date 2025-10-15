import React from 'react';

interface PracticeModeWarningProps {
  message?: string;
}

const PracticeModeWarning: React.FC<PracticeModeWarningProps> = ({
  message = "This is a safe simulation with fake data. Nothing here affects real blockchains or wallets."
}) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-accentYellow-500 p-4 rounded-r-lg mb-6">
      <p className="text-sm text-gray-700">
        <strong className="font-semibold text-accentYellow-700">Practice Mode:</strong> {message}
      </p>
    </div>
  );
};

export default PracticeModeWarning;

