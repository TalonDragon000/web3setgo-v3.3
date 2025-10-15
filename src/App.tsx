import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import NewBlogPage from './pages/NewBlogPage';
import QuizPage from './pages/QuizPage';
import SimulationsPage from './pages/SimulationsPage';
import SimulationPage from './pages/SimulationPage';
import NotFoundPage from './pages/NotFoundPage';
import RequireAdmin from './components/admin/RequireAdmin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-inter">
        <Navigation />
        <ScrollToTop />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/new" element={<RequireAdmin><NewBlogPage /></RequireAdmin>} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/simulations" element={<SimulationsPage />} />
            <Route path="/simulations/:slug" element={<SimulationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;