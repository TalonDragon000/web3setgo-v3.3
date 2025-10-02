import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const ResourceHub: React.FC = () => {
  const articles = [
    {
      slug: 'what-is-a-wallet',
      title: 'What is a Wallet?',
      description: 'Learn the basics of crypto wallets and how they keep your digital assets secure.',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center',
    },
    {
      slug: 'web2-vs-web3-explained',
      title: 'Web2 vs Web3 Explained',
      description: 'Understand the key differences between the internet we know and the decentralized web.',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&crop=center',
    },
    {
      slug: 'why-people-talk-about-blockchains',
      title: 'Why People Talk About Blockchains',
      description: 'Discover what makes blockchain technology revolutionary in simple, easy terms.',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&crop=center',
    },
  ];

  return (
    <section id="resource-hub" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn the Basics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with these beginner-friendly articles to build your Web3 foundation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              to={`/learning/${article.slug}`}
              key={index}
              className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up"
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
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.description}
                </p>
                
                <span className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors duration-200">
                <span className="inline-flex items-center text-ocean-500 font-semibold hover:text-ocean-600 transition-colors duration-200">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                </span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/learning"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;