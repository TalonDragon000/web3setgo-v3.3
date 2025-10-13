import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Plus, CreditCard as Edit } from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';
import { useAdmin } from '../contexts/AdminContext';

const BlogsPage: React.FC = () => {
  const { blogs, loading, error } = useBlogs();
  const { isAdmin } = useAdmin();
  const [selectedType, setSelectedType] = React.useState('All');

  const types = ['All', 'lesson', 'devlog', 'news', 'article'];

  const filteredBlogs = selectedType === 'All'
    ? blogs
    : blogs.filter(blog => blog.type === selectedType);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blogs</h2>
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
              className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-ocean-500" />
              <span className="text-xl font-semibold text-gray-900">Blogs</span>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Blogs Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Explore lessons, articles, developer logs, and the latest news in the Web3 space.
            Everything you need to understand blockchain, decentralized technology, and company updates.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 capitalize ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {type === 'All' ? 'All' : type === 'devlog' ? 'Dev Logs' : `${type}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        {isAdmin && (
          <Link
            to="/blogs/new"
            className="fixed bottom-8 right-8 p-4 bg-ocean-500 text-white rounded-full shadow-lg hover:bg-ocean-600 hover:shadow-xl transition-all duration-200 z-40"
            title="Create new blog post"
          >
            <Plus className="h-6 w-6" />
          </Link>
        )}

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/blogs/${blog.slug}`} className="block">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {blog.read_time}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(blog.difficulty)}`}>
                          {blog.difficulty}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors duration-200">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {blog.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ocean-500 font-medium capitalize">
                          {blog.type === 'devlog' ? 'Dev Log' : blog.type}
                        </span>
                        <span className="text-ocean-500 font-semibold group-hover:text-ocean-600 transition-colors duration-200">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>

                  {isAdmin && (
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-ocean-500 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Edit blog"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
