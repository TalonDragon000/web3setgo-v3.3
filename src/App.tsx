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
import QuizzesPage from './pages/QuizzesPage';
import QuizEditorPage from './pages/QuizEditorPage';
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
            
            {/* Blog Routes */}
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/new" element={<RequireAdmin><NewBlogPage /></RequireAdmin>} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            
            {/* Quiz Routes */}
            <Route path="/quiz" element={<QuizFunPage />} />
            <Route path="/quiz/:slug" element={<QuizFunPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quizzes/:id/edit" element={<RequireAdmin><QuizEditorPage /></RequireAdmin>} />
            
            {/* Simulation Routes */}
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