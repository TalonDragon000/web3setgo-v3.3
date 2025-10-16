import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Zap } from 'lucide-react';
import { useSimulations } from '../hooks/useSimulations';

const SimulationsPage: React.FC = () => {
  const { simulations, loading, error } = useSimulations();

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Wallet':
        return <Zap className="h-16 w-16 text-white" />;
      default:
        return <Zap className="h-16 w-16 text-white" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Simulations</h2>
          <p className="text-gray-600">{error}</p>
          <Link to="/" className="mt-4 inline-block text-ocean-500 hover:text-ocean-600">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-ocean-500" />
              <span className="text-xl font-semibold text-gray-900">Sims</span>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-mint-100 to-ocean-100 rounded-full mb-6">
            <Play className="h-8 w-8 text-ocean-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Interactive Web3 Simulations
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Learn by doing! Practice Web3 concepts in a safe, simulated environment.
            No real money, no risk just hands-on learning.
          </p>

          <div className="bg-blue-50 border-l-4 border-ocean-500 p-4 rounded-r-lg text-left max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              <strong className="font-semibold text-ocean-700">Practice Mode:</strong> These simulations use fake data and don't connect to real blockchains.
              Perfect for learning without any financial risk!
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
            </div>
          ) : simulations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-4">No simulations available yet.</p>
              <p className="text-gray-500">Check back soon for interactive learning experiences!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {simulations.map((simulation, index) => (
                <div
                  key={simulation.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/simulations/${simulation.slug}`}>
                    <div className={`h-40 bg-gradient-to-r ${simulation.color_scheme} flex items-center justify-center relative`}>
                      {getIconComponent(simulation.icon)}
                      {!simulation.published && (
                        <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Draft
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-ocean-600">
                          {simulation.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(simulation.difficulty)}`}>
                          {simulation.difficulty}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                        {simulation.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {simulation.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {simulation.duration}
                        </span>
                        <span className="inline-flex items-center text-ocean-500 font-semibold group-hover:text-ocean-600 transition-colors duration-200">
                          Start Simulation
                          <Play className="h-4 w-4 ml-2" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SimulationsPage;
