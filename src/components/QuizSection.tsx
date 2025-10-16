import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { quizMetadata } from '../data/quizzes/quizMetadata';

const QuizSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.HelpCircle;
  };

  return (
    <section id="quiz-section" className="py-20 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 lg:px-8">
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
          {quizMetadata.map((quiz, index) => {
            const IconComponent = getIcon(quiz.icon);
            return (
              <Link
                key={quiz.slug}
                to={`/quiz/${quiz.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-32 bg-gradient-to-r ${quiz.colorScheme} flex items-center justify-center`}>
                  <IconComponent className="h-12 w-12 text-white" />
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
                    <Icons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Quiz Journey
            <Icons.ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;