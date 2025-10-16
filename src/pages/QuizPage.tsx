import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target } from 'lucide-react';
import * as Icons from 'lucide-react';
import { quizMetadata } from '../data/quizzes/quizMetadata';

interface QuizOption {
  id: string;
  text: string;
  value: number;
  category: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface ResultCategory {
  title: string;
  description: string;
  advice: string;
}

interface QuizData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  colorScheme: string;
  questions: QuizQuestion[];
  resultCategories: { [key: string]: ResultCategory };
}

const QuizPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      import(`../data/quizzes/${slug}.json`)
        .then((module) => {
          setQuizData(module.default);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load quiz:', error);
          setLoading(false);
        });
    }
  }, [slug]);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.BookOpen;
  };

  const handleAnswerSelect = (optionId: string) => {
    if (!quizData) return;

    setAnswers({
      ...answers,
      [quizData.questions[currentQuestion].id]: optionId,
    });
  };

  const handleNext = () => {
    if (!quizData) return;

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    if (!quizData) return null;

    const categoryCounts: { [key: string]: number } = {};

    quizData.questions.forEach(question => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);

      if (selectedOption?.category) {
        categoryCounts[selectedOption.category] =
          (categoryCounts[selectedOption.category] || 0) + (selectedOption.value || 0);
      }
    });

    const topCategory = Object.entries(categoryCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    return {
      category: topCategory,
      result: quizData.resultCategories[topCategory] || {
        title: 'Result',
        description: 'Thank you for completing the quiz!',
        advice: '',
      },
    };
  };

  const restartCurrentQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!slug) {
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
                <BookOpen className="h-6 w-6 text-ocean-500" />
                <span className="text-xl font-semibold text-gray-900">Quizzes</span>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Discover Your Web3 Path
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take our interactive quizzes to understand how Web3 fits into your life, career, and investment goals.
            </p>
          </div>
        </section>

        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizMetadata.map((quiz, index) => {
                const IconComponent = getIconComponent(quiz.icon);

                return (
                  <Link
                    key={quiz.slug}
                    to={`/quiz/${quiz.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`h-32 bg-gradient-to-r ${quiz.colorScheme} flex items-center justify-center`}>
                      <IconComponent className="h-16 w-16 text-white" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                        {quiz.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {quiz.description}
                      </p>

                      <span className="text-ocean-500 font-semibold group-hover:text-ocean-600 transition-colors duration-200">
                        Start Quiz →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Quiz not found</p>
          <Link
            to="/quiz"
            className="text-ocean-600 hover:text-ocean-700 font-semibold"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(quizData.icon);

  if (showResult) {
    const result = calculateResult();

    if (!result) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p>Error calculating results</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/quiz"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Quizzes
            </Link>
          </div>
        </header>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className={`bg-gradient-to-r ${quizData.colorScheme} rounded-2xl p-8 text-white text-center mb-8`}>
              <IconComponent className="h-20 w-20 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-lg opacity-90">{quizData.title}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-mint-500 to-ocean-500 text-white mb-4">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {result.result.title}
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  {result.result.description}
                </p>
              </div>

              {result.result.advice && (
                <div className="bg-ocean-50 border-l-4 border-ocean-500 p-4 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">Recommended Next Steps:</h4>
                  <p className="text-gray-700 leading-relaxed">{result.result.advice}</p>
                </div>
              )}

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={restartCurrentQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
                >
                  Retake Quiz
                </button>
                <Link
                  to="/quiz"
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
                >
                  Try Another Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Quizzes
            </Link>

            <div className="flex items-center space-x-2">
              <Taget className="h-6 w-6 text-ocean-500" />
              <span className="text-xl font-semibold text-gray-900">Quizzes</span>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className={`bg-gradient-to-r ${quizData.colorScheme} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <IconComponent className="h-8 w-8 mr-3" />
                <h2 className="text-xl font-semibold">{quizData.title}</h2>
              </div>
              <span className="text-sm opacity-90">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {currentQuestionData.question}
            </h3>

            <div className="space-y-3 mb-8">
              {currentQuestionData.options.map((option) => {
                const isSelected = answers[currentQuestionData.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-ocean-500 bg-ocean-50'
                        : 'border-gray-200 hover:border-ocean-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          isSelected
                            ? 'border-ocean-500 bg-ocean-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-gray-900">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestionData.id]}
              className="w-full px-6 py-3 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
