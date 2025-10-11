import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, Shield } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from './admin/AdminLogin';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAdmin();

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    // If not on homepage, navigate to homepage
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {showLoginModal && (
        <AdminLogin onClose={() => setShowLoginModal(false)} />
      )}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src="/logo-short.png"
              alt="Web3SetGo Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900">Web3SetGo!</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/blogs"
              className="text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
            >
              Learn
            </Link>
            <Link
              to="/simulations"
              className="text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
            >
              Simulations
            </Link>
            <Link
              to="/blogs"
              className="text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              to="/quiz"
              className="text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
            >
              Quizzes
            </Link>
            {isAdmin ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-1 bg-ocean-100 text-ocean-700 rounded-lg">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Admin</span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Admin Login
              </button>
            )}
            <Link
              to="/blogs"
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-lg hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                Learn
              </Link>
              <Link
                to="/simulations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                Simulations
              </Link>
              <Link
                to="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                to="/quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
              >
                Quizzes
              </Link>
              {isAdmin ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-ocean-100 text-ocean-700 rounded-lg">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Admin Mode</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center px-4 py-2 text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 text-gray-600 hover:text-ocean-600 font-medium transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin Login
                </button>
              )}
              <Link
                to="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-lg hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
              >
                Start Learning
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navigation;