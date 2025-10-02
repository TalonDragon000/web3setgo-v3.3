import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-mint-500 to-ocean-500 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
            <img 
              src="/public/logo-full.png"
              alt="Web3SetGo Logo"
              className="w-16 h-16"
              />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start your Web3 journey today — no risk, no scams, just learning.
          </h2>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of learners who discovered Web3 the safe way. 
            Your future self will thank you for starting today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/learning"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Join Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <div className="text-white/80 text-sm">
            ✓ No credit card required  ✓ Start learning immediately
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white/90">
          <div>
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-sm">Active Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm">Learning Guides</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-sm">Risk-Free</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;