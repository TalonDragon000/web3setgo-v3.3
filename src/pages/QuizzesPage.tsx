import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit as EditIcon } from 'lucide-react';
import { useQuizzes } from '../hooks/useQuizzes';
import { useAdmin } from '../contexts/AdminContext';
import * as Icons from 'lucide-react';

const QuizzesPage: React.FC = () => {
  const { quizzes, loading, error } = useQuizzes();
  const { isAdmin } = useAdmin();
  const [selectedType, setSelectedType] = useState<'all' | 'knowledge' | 'personality'>('all');

  const types = ['all', 'knowledge', 'personality'];

  const filteredQuizzes = selectedType === 'all'
    ? quizzes
    : quizzes.filter(quiz => quiz.quiz_type === selectedType);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.BookOpen;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Quizzes</h2>
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
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center space-x-2">
              <Icons.BookOpen className="h-6 w-6 text-ocean-500" />
              <span className="text-xl font-semibold text-gray-900">Quiz Management</span>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Manage Quizzes
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create, edit, and manage all your interactive quizzes in one place.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 capitalize ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {type === 'all' ? 'All Quizzes' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        {isAdmin && (
          <Link
            to="/quizzes/new/edit"
            className="fixed bottom-8 right-8 p-4 bg-ocean-500 text-white rounded-full shadow-lg hover:bg-ocean-600 hover:shadow-xl transition-all duration-200 z-40"
            title="Create new quiz"
          >
            <Plus className="h-6 w-6" />
          </Link>
        )}

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
            </div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-4">No quizzes found.</p>
              {isAdmin && (
                <Link
                  to="/quizzes/new/edit"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Quiz
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredQuizzes.map((quiz, index) => {
                const IconComponent = getIconComponent(quiz.icon);
                
                return (
                  <div
                    key={quiz.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link to={`/quiz/${quiz.slug}`} className="block">
                      <div className={`h-32 bg-gradient-to-r ${quiz.color_scheme} flex items-center justify-center`}>
                        <IconComponent className="h-16 w-16 text-white" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-ocean-100 text-ocean-700 capitalize">
                            {quiz.quiz_type}
                          </span>
                          {!quiz.published && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                              Draft
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                          {quiz.title}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {quiz.description}
                        </p>

                        <span className="text-ocean-500 font-semibold group-hover:text-ocean-600 transition-colors duration-200">
                          Take Quiz →
                        </span>
                      </div>
                    </Link>

                    {isAdmin && (
                      <Link
                        to={`/quizzes/${quiz.id}/edit`}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-ocean-500 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Edit quiz"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EditIcon className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuizzesPage;

