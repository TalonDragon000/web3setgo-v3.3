import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Zap } from 'lucide-react';

interface SimulationCardProps {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  color: string;
  icon: string;
}

const SimulationCard: React.FC<SimulationCardProps> = ({
  slug,
  title,
  description,
  difficulty,
  duration,
  color: 'from-mint-500 to-ocean-500',
  icon: Zap, 
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      to={`/simulations/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`h-32 bg-gradient-to-r ${colorScheme} flex items-center justify-center relative`}>
        <Zap className="h-12 w-12 text-white" />
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-white">PRACTICE</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
            Interactive Simulation
          </span>
          <span className="inline-flex items-center text-ocean-500 font-semibold group-hover:text-ocean-600 transition-colors duration-200 text-sm">
            Try Now
            <Play className="h-4 w-4 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SimulationCard;
