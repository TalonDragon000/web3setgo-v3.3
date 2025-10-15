import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useQuizzes } from '../hooks/useQuizzes';
import { useQuizBySlug } from '../hooks/useQuizBySlug';

interface QuizOption {
  id: string;
  text: string;
  value?: number;
  category?: string;
  correct?: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

const QuizPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { quizzes, loading: quizzesLoading } = useQuizzes();
  const { quiz: specificQuiz, loading: quizLoading } = useQuizBySlug(slug);
  
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);

  // If slug is provided, auto-select that quiz
  useEffect(() => {
    if (slug && specificQuiz) {
      setSelectedQuiz(specificQuiz.id);
    }
  }, [slug, specificQuiz]);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.BookOpen;
  };

  const getCurrentQuiz = () => {
    if (slug && specificQuiz) {
      return specificQuiz;
    }
    return quizzes.find(q => q.id === selectedQuiz);
  };

  const currentQuiz = getCurrentQuiz();
  const questions: QuizQuestion[] = currentQuiz?.questions 
    ? (typeof currentQuiz.questions === 'string' 
        ? JSON.parse(currentQuiz.questions) 
        : currentQuiz.questions)
    : [];

  const resultCategories = currentQuiz?.result_categories
    ? (typeof currentQuiz.result_categories === 'string'
        ? JSON.parse(currentQuiz.result_categories)
        : currentQuiz.result_categories)
    : {};

  const handleAnswerSelect = (optionId: string) => {
    if (!currentQuiz) return;
    
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    if (!currentQuiz) return null;

    if (currentQuiz.quiz_type === 'knowledge') {
      // Calculate score for knowledge quiz
      let correct = 0;
      questions.forEach(question => {
        const selectedOptionId = answers[question.id];
        const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
        if (selectedOption?.correct === 1) {
          correct++;
        }
      });
      
      const percentage = (correct / questions.length) * 100;
      const passed = percentage >= (currentQuiz.passing_score || 70);
      
      return {
        type: 'knowledge' as const,
        score: correct,
        total: questions.length,
        percentage: Math.round(percentage),
        passed,
      };
    } else {
      // Calculate category for personality quiz
      const categoryCounts: { [key: string]: number } = {};
      
      questions.forEach(question => {
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
        type: 'personality' as const,
        category: topCategory,
        result: resultCategories[topCategory] || {
          title: 'Result',
          description: 'Thank you for completing the quiz!',
          advice: '',
        },
      };
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const restartCurrentQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (quizzesLoading || quizLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  // Quiz Selection View
  if (!selectedQuiz || !currentQuiz) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </header>

        <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Test Your Knowledge
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Challenge yourself with interactive quizzes designed to assess your Web3 understanding
            </p>
          </div>
        </section>

        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {quizzes.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No quizzes available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quizzes.map((quiz, index) => {
                  const IconComponent = getIconComponent(quiz.icon);
                  
                  return (
                    <button
                      key={quiz.id}
                      onClick={() => setSelectedQuiz(quiz.id)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`h-32 bg-gradient-to-r ${quiz.color_scheme} flex items-center justify-center`}>
                        <IconComponent className="h-16 w-16 text-white" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-ocean-100 text-ocean-700 capitalize">
                            {quiz.quiz_type}
                          </span>
                        </div>

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
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  const IconComponent = getIconComponent(currentQuiz.icon);

  // Results View
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
            <button
              onClick={resetQuiz}
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Quizzes
            </button>
          </div>
        </header>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className={`bg-gradient-to-r ${currentQuiz.color_scheme} rounded-2xl p-8 text-white text-center mb-8`}>
              <IconComponent className="h-20 w-20 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-lg opacity-90">{currentQuiz.title}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {result.type === 'knowledge' ? (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-mint-500 to-ocean-500 text-white mb-4">
                      <span className="text-3xl font-bold">{result.percentage}%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {result.passed ? 'Congratulations!' : 'Keep Learning!'}
                    </h3>
                    <p className="text-gray-600">
                      You scored {result.score} out of {result.total} questions correctly
                    </p>
                    {result.passed ? (
                      <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Passed
                      </div>
                    ) : (
                      <p className="mt-4 text-gray-600">
                        You need {currentQuiz.passing_score || 70}% to pass. Try again!
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={restartCurrentQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
                >
                  Try Another Quiz
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Quiz Taking View
  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={resetQuiz}
            className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Quizzes
          </button>
        </div>
      </header>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className={`bg-gradient-to-r ${currentQuiz.color_scheme} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <IconComponent className="h-8 w-8 mr-3" />
                <h2 className="text-xl font-semibold">{currentQuiz.title}</h2>
              </div>
              <span className="text-sm opacity-90">
                Question {currentQuestion + 1} of {questions.length}
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
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
