import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';

const QuizSection: React.FC = () => {
  const quizzes = [
    {
      id: 'web3-for-me',
      title: 'Is Web3 For Me?',
      description: 'Discover which Web3 features could benefit your work and lifestyle',
      icon: Target,
      color: 'from-mint-500 to-ocean-500',
    },
    {
      id: 'career-assessment',
      title: 'Web3 Career Assessment',
      description: 'Find your ideal Web3 career path based on your interests and skills',
      icon: Briefcase,
      color: 'from-success-500 to-mint-500',
    },
    {
      id: 'bull-or-bear',
      title: 'Are You Bull or Bear?',
      description: 'Discover your Web3 and crypto sentiment and investment personality',
      icon: TrendingUp,
      color: 'from-accentYellow-500 to-orange-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Web3 Path
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take our interactive quizzes to understand how Web3 fits into your life, 
            career, and investment goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-32 bg-gradient-to-r ${quiz.color} flex items-center justify-center`}>
                <quiz.icon className="h-12 w-12 text-white" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                  {quiz.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {quiz.description}
                </p>
                
                <span className="inline-flex items-center text-ocean-500 font-semibold hover:text-ocean-600 transition-colors duration-200">
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Quiz Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;