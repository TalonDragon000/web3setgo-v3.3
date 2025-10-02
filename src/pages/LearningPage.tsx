import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Users, TrendingUp } from 'lucide-react';

const LearningPage: React.FC = () => {
  const articles = [
    {
      slug: 'what-is-a-wallet',
      title: 'What is a Wallet?',
      description: 'Learn the basics of crypto wallets and how they keep your digital assets secure.',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center',
      category: 'Basics',
      difficulty: 'Beginner',
    },
    {
      slug: 'web2-vs-web3-explained',
      title: 'Web2 vs Web3 Explained',
      description: 'Understand the key differences between the internet we know and the decentralized web.',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&crop=center',
      category: 'Concepts',
      difficulty: 'Beginner',
    },
    {
      slug: 'why-people-talk-about-blockchains',
      title: 'Why People Talk About Blockchains',
      description: 'Discover what makes blockchain technology revolutionary in simple, easy terms.',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&crop=center',
      category: 'Technology',
      difficulty: 'Beginner',
    },
    {
      slug: 'understanding-smart-contracts',
      title: 'Understanding Smart Contracts',
      description: 'Learn how smart contracts work and why they\'re changing how we do business online.',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
      category: 'Technology',
      difficulty: 'Intermediate',
    },
    {
      slug: 'defi-for-beginners',
      title: 'DeFi for Beginners',
      description: 'Explore decentralized finance and how it\'s creating new opportunities for everyone.',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&crop=center',
      category: 'Finance',
      difficulty: 'Intermediate',
    },
    {
      slug: 'nfts-beyond-the-hype',
      title: 'NFTs: Beyond the Hype',
      description: 'Understanding the real utility and potential of non-fungible tokens.',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=250&fit=crop&crop=center',
      category: 'Digital Assets',
      difficulty: 'Intermediate',
    },
  ];

  const categories = ['All', 'Basics', 'Concepts', 'Technology', 'Finance', 'Digital Assets'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
              <img 
                src="/src/assets/logo-short.png"
                alt="Web3SetGo Logo"
                className="w-6 h-6"
              />
              <span className="text-xl font-semibold text-gray-900">Learning Hub</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Learn Web3 at Your Own Pace
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive guides and tutorials to help you understand Web3 concepts, 
            from basic wallets to advanced DeFi strategies.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Users className="h-5 w-5 text-mint-500" />
              <span className="text-sm">10,000+ Learners</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <BookOpen className="h-5 w-5 text-success-500" />
              <span className="text-sm">50+ Articles</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <TrendingUp className="h-5 w-5 text-accentYellow-500" />
              <span className="text-sm">Updated Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link
                key={article.slug}
                to={`/learning/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ocean-500 font-medium">
                      {article.category}
                    </span>
                    <span className="text-ocean-500 font-semibold group-hover:text-ocean-600 transition-colors duration-200">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPage;