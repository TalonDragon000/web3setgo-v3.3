import React from 'react';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface CompletionScreenProps {
  title: string;
  description: string;
  learningPoints?: string[];
  onRestart?: () => void;
  onBackToList: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  title,
  description,
  learningPoints,
  onRestart,
  onBackToList,
}) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-success-100 to-mint-100 mb-6">
        <CheckCircle className="h-10 w-10 text-success-600" />
      </div>
      
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        {description}
      </p>

      {learningPoints && learningPoints.length > 0 && (
        <div className="bg-gradient-to-r from-mint-50 to-ocean-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">What You Learned:</h3>
          <div className="grid md:grid-cols-2 gap-3 text-left">
            {learningPoints.map((point, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onRestart && (
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </button>
        )}
        <button
          onClick={onBackToList}
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-ocean-600 font-semibold rounded-xl border-2 border-ocean-500 hover:bg-ocean-50 transition-colors duration-200"
        >
          Try Another Simulation
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;

