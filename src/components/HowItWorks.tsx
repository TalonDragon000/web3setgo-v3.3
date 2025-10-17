import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Wallet, Shield, BookOpen, Sparkles } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Wallet,
      title: 'Create account & get test wallet',
      description: 'Sign up in seconds and receive a practice wallet loaded with fake crypto.',
    },
    {
      icon: BookOpen,
      title: 'Read quick learning guides',
      description: 'Understand the basics through simple explanations.',
    },
    {
      icon: Shield,
      title: 'Practice transactions risk-free',
      description: 'Send, receive, and trade without real money.',
    },
    {
      icon: Sparkles,
      title: 'Explore safe vetted apps',
      description: 'Try real Web3 apps in a protected environment.',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your Web3 journey in 4 simple steps. No risk, no confusion, just learning.
          </p>
        </div>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-4 gap-8 items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-mint-200">
                      <step.icon className="h-8 w-8 text-ocean-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-mint-500 to-ocean-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Steps */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-mint-50 rounded-xl flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-ocean-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-mint-500 to-ocean-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/blogs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started — It's Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;