import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-20 pb-16">
        {/* Floating owl for larger screens -- optional
        <div className="hidden xl:block absolute top-32 right-8 animate-bounce" style={{ animationDuration: '3s' }}>
          <img 
            src="/src/assets/owl-fly.gif"
            alt="OWL flying"
            className="w-auto h-32 opacity-75 hover:opacity-40 transition-opacity duration-300"
          />
        </div>
        */}
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Learn Web3 the{' '}
              <span className="bg-gradient-to-r from-mint-600 to-ocean-600 bg-clip-text text-transparent">Safe & Simple</span> Way
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Step-by-step guides, practice tools, and beginner-friendly resources 
              to help you explore Web3 without risk.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/learning"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
              
              
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="inline-flex items-center px-8 py-4 bg-white text-ocean-600 font-semibold rounded-xl border-2 border-ocean-500 hover:bg-ocean-50 transition-colors duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </button>
            </div>
          </div>
          
          {/* Right Illustration */}
          <div className="animate-fade-in">
            <div className="inline-flex">
              <img 
                src="/nova-intro.png"
                alt="Nova, the Web3 learning mascot, hand outward with enthusiasm"
                classname="w-full h-auto rounded-2xl shadow-2xl mb-10"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accentYellow-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-ocean-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('why-learn')}
            className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronDown className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;