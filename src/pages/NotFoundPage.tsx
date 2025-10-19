import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden text-center">
          {/* Nova 404 Image */}
          <div className="mb-8 animate-fade-in">
            <img 
              src="/nova-404.png"
              alt="Nova the mascot looking confused - Page not found"
              className="w-full max-w-md mx-auto h-auto"
            />
          </div>
          
          {/* Error Message */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-4">
              404
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
              Looks like Nova got a bit lost in the Web3 space! The page you're looking for doesn't exist, 
              but don't worry - we'll help you get back on track.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              to="/learning"
              className="inline-flex items-center px-8 py-4 bg-white text-ocean-600 font-semibold rounded-xl border-2 border-ocean-500 hover:bg-ocean-50 transition-colors duration-200"
            >
              Start Learning
            </Link>
          </div>
          
          {/* Additional Help */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-gray-500 mb-4">
              Need help finding something specific?
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                to="/#why-learn" 
                className="text-ocean-500 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                Why Learn Web3
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                to="/#how-it-works" 
                className="text-ocean-500 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                How It Works
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                to="/#resource-hub" 
                className="text-ocean-500 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                Learning Resources
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-10">
          {/* Left Side - Nova 404 Image */}
          <div className="flex-1 animate-fade-in flex justify-center">
            <img 
              src="/nova-404.png"
              alt="Nova the mascot looking confused - Page not found"
              className="w-full max-w-lg h-auto"
            />
          </div>
          
          {/* Right Side - Error Message */}
          <div className="flex-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-8xl font-bold text-gray-900 mb-6">
              404
            </h1>
            
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
              Oops! Page Not Found
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Looks like Nova got a bit lost in the Web3 space! The page you're looking for doesn't exist, 
              but don't worry - we'll help you get back on track.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/learning"
                className="inline-flex items-center px-8 py-4 bg-white text-ocean-600 font-semibold rounded-xl border-2 border-ocean-500 hover:bg-ocean-50 transition-colors duration-200"
              >
                Start Learning
              </Link>
            </div>
            
            {/* Additional Help */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-gray-500 mb-4">
                Need help finding something specific?
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <Link 
                  to="/#why-learn" 
                  className="text-ocean-500 hover:text-ocean-600 font-medium transition-colors duration-200"
                >
                  Why Learn Web3
                </Link>
                <span className="text-gray-300">•</span>
                <Link 
                  to="/#how-it-works" 
                  className="text-ocean-500 hover:text-ocean-600 font-medium transition-colors duration-200"
                >
                  How It Works
                </Link>
                <span className="text-gray-300">•</span>
                <Link 
                  to="/#resource-hub" 
                  className="text-ocean-500 hover:text-ocean-600 font-medium transition-colors duration-200"
                >
                  Learning Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;