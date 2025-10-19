import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogIn, LogOut, Shield, Twitter, Telegram, Github } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from './admin/AdminLogin';

const Footer: React.FC = () => {
  const { isAdmin, logout } = useAdmin();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    // If not on homepage, navigate to homepage
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {showLoginModal && (
        <AdminLogin onClose={() => setShowLoginModal(false)} />
      )}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 mb-4"
            >
              <img 
                src="/logo-short.png"
                alt="Web3SetGo Logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Web3SetGo!</span>
            </button>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Learn Web3 the safe and simple way. Step-by-step guides and practice tools 
              to help you explore the future of the internet without risk.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('sims')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Simulations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('resource-hub')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Blogs
                </button>
              </li>
             <li>
                <button
                  onClick={() => scrollToSection('quiz-section')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Quizzes
                </button>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
            <div className="flex items-center justify-left gap-2">
              <Link
                 to="https://x.com/Web3SetGo"
                 className="text-gray-400 hover:text-white transition-colors duration-200"> 
                 <Twitter />
              </Link>
              <Link
                 to="https://github.com/TalonDragon000/web3setgo-v3.3"
                 className="text-gray-400 hover:text-white transition-colors duration-200"
               >
                 <Github />
              </Link>
            </div>
              <li>
                <Link
                  to="https://forms.gle/JaycjrF7moBvrPXv8"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Email Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 Web3SetGo! v3.3.0 All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-blue-500" /> for Web3 learners
          </p>

          {/* Admin Login/Logout */}
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                <Shield className="h-3 w-3" />
                <span>Admin</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-2.5 py-1 text-gray-400 hover:text-white transition-colors duration-200 text-xs"
              >
                <LogOut className="h-3 w-3" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-gray-400 hover:text-white transition-colors duration-200 text-xs"
            >
              <LogIn className="h-3 w-3" />
              Admin Login
            </button>
          )}
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;