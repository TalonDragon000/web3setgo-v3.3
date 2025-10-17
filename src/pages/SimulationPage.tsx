import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Lightbulb, CheckCircle, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSimulationBySlug } from '../hooks/useSimulationBySlug';
import { SimulationProvider, useSimulationContext } from '../contexts/SimulationContext';
import { getSimulationComponentByType, getSimulationStepMetadata, getSimulationStepCount } from '../components/simulations/SimulationRegistry';

const SimulationContent: React.FC<{ simulationSlug: string }> = ({ simulationSlug }) => {
  const { simulation, loading } = useSimulationBySlug(simulationSlug);
  const { state, setCurrentStep, resetSimulation } = useSimulationContext();
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!simulation) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Simulation Not Found</h1>
          <Link to="/simulations" className="text-ocean-500 hover:text-ocean-600 font-medium">
            ← Back to Simulations
          </Link>
        </div>
      </div>
    );
  }

  const steps = getSimulationStepMetadata(simulation.component_type);
  const stepCount = getSimulationStepCount(simulation.component_type);
  const currentStepData = steps[state.currentStep];
  const progress = ((state.currentStep + 1) / stepCount) * 100;

  const handleComplete = () => {
    setIsComplete(true);
  };

  const handleRestart = () => {
    resetSimulation();
    setIsComplete(false);
    setShowHint(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/simulations"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Simulations
            </Link>
          </div>
        </header>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-success-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simulation Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Great job! You've successfully completed the {simulation.title} simulation.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What You Learned</h2>
              <div className="text-left space-y-3">
                {steps.slice(0, -1).map((step) => (
                  <div key={step.step_order} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 inline-flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </button>
              <Link
                to="/simulations"
                className="px-8 py-4 bg-white text-ocean-600 font-semibold rounded-xl border-2 border-ocean-500 hover:bg-ocean-50 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Try Another Simulation
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/simulations"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Simulations
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Step {state.currentStep + 1} of {stepCount}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-mint-500 to-ocean-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border-l-4 border-accentYellow-500 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-gray-700">
            <strong className="font-semibold text-accentYellow-700">Practice Mode:</strong> This is a safe simulation with fake data. Nothing here affects real blockchains or wallets.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentStepData?.title}
              </h2>

              <div className="prose prose-sm max-w-none mb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentStepData?.description || ''}
                </ReactMarkdown>
              </div>

              {currentStepData?.hints && currentStepData.hints.length > 0 && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-accentYellow-50 text-accentYellow-700 rounded-lg hover:bg-accentYellow-100 transition-colors duration-200 border border-accentYellow-200"
                >
                  <Lightbulb className="h-5 w-5 mr-2" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              )}

              {showHint && currentStepData?.hints && (
                <div className="mt-4 p-4 bg-accentYellow-50 border border-accentYellow-200 rounded-lg">
                  <div className="space-y-2">
                    {currentStepData.hints.map((hint, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        {currentStepData.hints.length > 1 && `${index + 1}. `}
                        {hint}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {(() => {
              // Use component_type from database to get the correct component
              const SimulationComponent = simulation.component_type ? getSimulationComponentByType(simulation.component_type) : null;

              if (SimulationComponent) {
                return (
                  <SimulationComponent
                    onComplete={handleComplete}
                  />
                );
              }

              return (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accentYellow-100 mb-4">
                      <span className="text-2xl">🚧</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Coming Soon
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      This simulation is currently being developed. Check back soon to try it out!
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

const SimulationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Simulation</h1>
          <Link to="/simulations" className="text-ocean-500 hover:text-ocean-600 font-medium">
            ← Back to Simulations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SimulationProvider>
      <SimulationContent simulationSlug={slug} />
    </SimulationProvider>
  );
};

export default SimulationPage;
