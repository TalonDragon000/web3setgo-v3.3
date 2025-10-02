import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
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
                src="/public/logo-short.png"
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
                  onClick={() => scrollToSection('why-learn')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Why Learn Web3
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link
                  to="/learning"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Learning Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/learning/what-is-a-wallet"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  What is a Wallet?
                </Link>
              </li>
              <li>
                <Link
                  to="/learning/web2-vs-web3-explained"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Web2 vs Web3
                </Link>
              </li>
              <li>
                <Link
                  to="/learning/why-people-talk-about-blockchains"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Blockchains
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Web3SetGo! v0.3.1. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-blue-500" /> for Web3 learners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;