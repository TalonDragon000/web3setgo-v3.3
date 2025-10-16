import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import { useSimulations } from '../hooks/useSimulations';
import SimulationCard from './SimulationCard';

const SimulationsSection: React.FC = () => {
  const { simulations, loading } = useSimulations();

  const displaySimulations = simulations.slice(0, 3);

  return (
    <section id="sims" className="py-20 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Practice with Interactive Simulations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn by doing in a safe environment. Try out Web3 concepts without any risk.
          </p>
        </div>
      </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
          </div>
        ) : simulations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">New simulations coming soon!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displaySimulations.map((simulation, index) => (
                <div
                  key={simulation.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SimulationCard
                    slug={simulation.slug}
                    title={simulation.title}
                    description={simulation.description}
                    difficulty={simulation.difficulty}
                    duration={simulation.duration}
                    colorScheme={simulation.color_scheme}
                  />
                </div>
              ))}
            </div>

            {simulations.length > 3 && (
              <div className="text-center">
                <Link
                  to="/simulations"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  View All Simulations
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            )}
          </>
        )}
    </section>
  );
};

export default SimulationsSection;
