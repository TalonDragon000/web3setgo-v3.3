import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, TrendingUp, TrendingDown, Briefcase, Heart, Brain, Target } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  value: number;
  category?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  questions: QuizQuestion[];
  resultCategories: { [key: string]: { title: string; description: string; advice: string } };
}

const QuizPage: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);

  const quizzes: Quiz[] = [
    {
      id: 'web3-for-me',
      title: 'Is Web3 For Me?',
      description: 'Discover which Web3 features could benefit your work and lifestyle',
      icon: Target,
      color: 'from-mint-500 to-ocean-500',
      questions: [
        {
          id: 'work-type',
          question: 'What best describes your work?',
          options: [
            { id: 'creative', text: 'Creative work (art, writing, music)', value: 3, category: 'creator' },
            { id: 'business', text: 'Business/entrepreneurship', value: 2, category: 'business' },
            { id: 'tech', text: 'Technology/development', value: 3, category: 'tech' },
            { id: 'finance', text: 'Finance/investing', value: 3, category: 'finance' },
            { id: 'other', text: 'Other profession', value: 1, category: 'general' }
          ]
        },
        {
          id: 'pain-points',
          question: 'What frustrates you most about current systems?',
          options: [
            { id: 'middlemen', text: 'Too many middlemen taking cuts', value: 3, category: 'creator' },
            { id: 'control', text: 'Lack of control over my data', value: 2, category: 'privacy' },
            { id: 'access', text: 'Limited access to global markets', value: 3, category: 'business' },
            { id: 'fees', text: 'High transaction fees', value: 2, category: 'finance' },
            { id: 'none', text: 'Current systems work fine for me', value: 0, category: 'general' }
          ]
        },
        {
          id: 'interests',
          question: 'Which Web3 concept interests you most?',
          options: [
            { id: 'nfts', text: 'Owning digital assets (NFTs)', value: 3, category: 'creator' },
            { id: 'defi', text: 'Decentralized finance (DeFi)', value: 3, category: 'finance' },
            { id: 'dao', text: 'Community governance (DAOs)', value: 2, category: 'business' },
            { id: 'identity', text: 'Digital identity control', value: 2, category: 'privacy' },
            { id: 'unsure', text: 'Not sure yet', value: 1, category: 'general' }
          ]
        }
      ],
      resultCategories: {
        creator: {
          title: 'Web3 Creator',
          description: 'Web3 offers powerful tools for creators like you!',
          advice: 'Explore NFT marketplaces, creator DAOs, and direct fan monetization. You could benefit from royalty systems and cutting out traditional middlemen.'
        },
        finance: {
          title: 'DeFi Explorer',
          description: 'Decentralized finance could revolutionize your financial activities.',
          advice: 'Start with yield farming, liquidity pools, and decentralized exchanges. Learn about lending protocols and automated market makers.'
        },
        business: {
          title: 'Web3 Entrepreneur',
          description: 'Web3 opens new business models and global opportunities.',
          advice: 'Investigate DAOs, tokenomics, and blockchain-based business models. Consider how smart contracts could automate your processes.'
        },
        tech: {
          title: 'Web3 Builder',
          description: 'Your technical skills are perfect for the Web3 ecosystem.',
          advice: 'Dive into smart contract development, dApp creation, and blockchain protocols. The demand for Web3 developers is huge!'
        },
        privacy: {
          title: 'Digital Sovereignty Seeker',
          description: 'Web3 aligns with your desire for data control and privacy.',
          advice: 'Focus on self-sovereign identity, decentralized storage, and privacy-focused protocols. You\'ll love having control over your digital footprint.'
        },
        general: {
          title: 'Web3 Curious',
          description: 'Web3 might not be immediately relevant, but it\'s worth understanding.',
          advice: 'Start with basic education about blockchain and cryptocurrency. Keep an eye on developments that might affect your industry in the future.'
        }
      }
    },
    {
      id: 'career-assessment',
      title: 'Web3 Career Assessment',
      description: 'Find your ideal Web3 career path based on your interests and skills',
      icon: Briefcase,
      color: 'from-success-500 to-mint-500',
      questions: [
        {
          id: 'skills',
          question: 'What are your strongest skills?',
          options: [
            { id: 'coding', text: 'Programming and development', value: 3, category: 'developer' },
            { id: 'design', text: 'Design and user experience', value: 2, category: 'designer' },
            { id: 'writing', text: 'Writing and communication', value: 2, category: 'content' },
            { id: 'analysis', text: 'Data analysis and research', value: 3, category: 'analyst' },
            { id: 'people', text: 'Working with people and teams', value: 2, category: 'community' }
          ]
        },
        {
          id: 'work-style',
          question: 'What work environment do you prefer?',
          options: [
            { id: 'technical', text: 'Deep technical problem-solving', value: 3, category: 'developer' },
            { id: 'creative', text: 'Creative and visual projects', value: 3, category: 'designer' },
            { id: 'research', text: 'Research and analysis', value: 3, category: 'analyst' },
            { id: 'social', text: 'Community building and engagement', value: 3, category: 'community' },
            { id: 'education', text: 'Teaching and content creation', value: 3, category: 'content' }
          ]
        },
        {
          id: 'motivation',
          question: 'What motivates you most about Web3?',
          options: [
            { id: 'innovation', text: 'Building cutting-edge technology', value: 3, category: 'developer' },
            { id: 'adoption', text: 'Making Web3 accessible to everyone', value: 2, category: 'designer' },
            { id: 'education', text: 'Helping others understand Web3', value: 3, category: 'content' },
            { id: 'data', text: 'Understanding market trends', value: 3, category: 'analyst' },
            { id: 'community', text: 'Building strong communities', value: 3, category: 'community' }
          ]
        }
      ],
      resultCategories: {
        developer: {
          title: 'Web3 Developer',
          description: 'You\'re perfect for building the future of the internet!',
          advice: 'Focus on Solidity, smart contract development, and dApp creation. Consider specializing in DeFi protocols, NFT platforms, or Layer 2 solutions.'
        },
        designer: {
          title: 'Web3 UX/UI Designer',
          description: 'Web3 desperately needs great designers to improve user experience.',
          advice: 'Learn about wallet UX, DeFi interfaces, and NFT marketplaces. Your skills in making complex systems simple are invaluable in Web3.'
        },
        analyst: {
          title: 'Web3 Analyst',
          description: 'Your analytical skills are crucial for understanding Web3 markets.',
          advice: 'Dive into on-chain analytics, tokenomics research, and DeFi protocol analysis. Consider roles at crypto funds or research firms.'
        },
        content: {
          title: 'Web3 Content Creator',
          description: 'Web3 needs clear communicators to bridge the knowledge gap.',
          advice: 'Create educational content, technical documentation, or community resources. Consider roles in developer relations or content marketing.'
        },
        community: {
          title: 'Web3 Community Manager',
          description: 'Strong communities are the backbone of successful Web3 projects.',
          advice: 'Focus on Discord/Telegram management, DAO governance, and community growth strategies. Your people skills are essential for Web3 adoption.'
        }
      }
    },
    {
      id: 'bull-or-bear',
      title: 'Are You Bull or Bear?',
      description: 'Discover your Web3 and crypto sentiment and investment personality',
      icon: TrendingUp,
      color: 'from-accentYellow-500 to-orange-500',
      questions: [
        {
          id: 'market-view',
          question: 'How do you view the current crypto market?',
          options: [
            { id: 'bullish', text: 'Very optimistic - we\'re going to the moon! 🚀', value: 3, category: 'bull' },
            { id: 'cautious-bull', text: 'Optimistic but cautious', value: 2, category: 'bull' },
            { id: 'neutral', text: 'Neutral - waiting to see what happens', value: 0, category: 'neutral' },
            { id: 'cautious-bear', text: 'Pessimistic but open-minded', value: -2, category: 'bear' },
            { id: 'bearish', text: 'Very pessimistic - it\'s all going to crash', value: -3, category: 'bear' }
          ]
        },
        {
          id: 'investment-style',
          question: 'What\'s your investment approach?',
          options: [
            { id: 'hodl', text: 'HODL forever - diamond hands 💎', value: 3, category: 'bull' },
            { id: 'dca', text: 'Dollar-cost averaging regularly', value: 2, category: 'bull' },
            { id: 'swing', text: 'Buy dips, sell peaks', value: 0, category: 'neutral' },
            { id: 'minimal', text: 'Very small, experimental amounts', value: -1, category: 'bear' },
            { id: 'none', text: 'I don\'t invest in crypto', value: -3, category: 'bear' }
          ]
        },
        {
          id: 'future-outlook',
          question: 'Where do you see Web3 in 5 years?',
          options: [
            { id: 'mainstream', text: 'Mainstream adoption everywhere', value: 3, category: 'bull' },
            { id: 'growing', text: 'Steady growth and real use cases', value: 2, category: 'bull' },
            { id: 'niche', text: 'Useful but still niche', value: 0, category: 'neutral' },
            { id: 'struggling', text: 'Still struggling with adoption', value: -2, category: 'bear' },
            { id: 'failed', text: 'Mostly failed experiment', value: -3, category: 'bear' }
          ]
        }
      ],
      resultCategories: {
        bull: {
          title: '🐂 Crypto Bull',
          description: 'You\'re optimistic about Web3\'s future and ready to ride the waves!',
          advice: 'Your enthusiasm is great, but remember to manage risk. Consider DCA strategies, diversification, and never invest more than you can afford to lose. Stay informed about market cycles.'
        },
        bear: {
          title: '🐻 Crypto Bear',
          description: 'You\'re skeptical about Web3 and prefer to be cautious.',
          advice: 'Your caution is valuable in volatile markets. Consider starting with education rather than investment. If you do invest, start very small and focus on established projects with real utility.'
        },
        neutral: {
          title: '🦎 Crypto Chameleon',
          description: 'You adapt to market conditions and stay balanced.',
          advice: 'Your balanced approach is wise. Focus on fundamental analysis, diversification, and having both bull and bear market strategies. You\'re well-positioned for long-term success.'
        }
      }
    }
  ];

  const currentQuiz = quizzes.find(q => q.id === selectedQuiz);
  const currentQuestionData = currentQuiz?.questions[currentQuestion];

  const handleAnswerSelect = (optionId: string) => {
    if (!currentQuiz) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData!.id]: optionId
    }));
  };

  const handleNext = () => {
    if (!currentQuiz) return;
    
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    if (!currentQuiz) return null;
    
    const categoryScores: { [key: string]: number } = {};
    
    currentQuiz.questions.forEach(question => {
      const answerId = answers[question.id];
      const selectedOption = question.options.find(opt => opt.id === answerId);
      
      if (selectedOption && selectedOption.category) {
        categoryScores[selectedOption.category] = (categoryScores[selectedOption.category] || 0) + selectedOption.value;
      }
    });
    
    const topCategory = Object.entries(categoryScores).reduce((a, b) => 
      categoryScores[a[0]] > categoryScores[b[0]] ? a : b
    )[0];
    
    return currentQuiz.resultCategories[topCategory];
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

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
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

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Interactive Web3 Quizzes
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover your Web3 journey with our fun, personalized quizzes. 
              Get insights about your interests, career potential, and market sentiment.
            </p>
          </div>
        </section>

        {/* Quiz Selection */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedQuiz(quiz.id)}
                >
                  <div className={`h-32 bg-gradient-to-r ${quiz.color} flex items-center justify-center`}>
                    <quiz.icon className="h-16 w-16 text-white" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                      {quiz.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {quiz.description}
                    </p>
                    
                    <span className="inline-flex items-center text-ocean-500 font-semibold hover:text-ocean-600 transition-colors duration-200">
                      Take Quiz →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (showResult) {
    const result = calculateResult();
    
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
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

        {/* Result */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-success-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {result?.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {result?.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Personalized Advice</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {result?.advice}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartCurrentQuiz}
                className="px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
              >
                Retake Quiz
              </button>
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-white text-ocean-600 font-semibold rounded-xl border-2 border-ocean-500 hover:bg-ocean-50 transition-colors duration-200"
              >
                Try Another Quiz
              </button>
              <Link
                to="/learning"
                className="px-8 py-4 bg-accentYellow-500 text-white font-semibold rounded-xl hover:bg-accentYellow-600 transition-colors duration-200"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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

      {/* Quiz Progress */}
      <section className="bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{currentQuiz?.title}</h1>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} of {currentQuiz?.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-mint-500 to-ocean-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / (currentQuiz?.questions.length || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Question */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              {currentQuestionData?.question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {currentQuestionData?.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQuestionData.id] === option.id
                      ? 'border-ocean-500 bg-ocean-50 text-ocean-700'
                      : 'border-gray-200 hover:border-ocean-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      answers[currentQuestionData.id] === option.id
                        ? 'border-ocean-500 bg-ocean-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestionData.id] === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestionData?.id || '']}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < (currentQuiz?.questions.length || 0) - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizPage;