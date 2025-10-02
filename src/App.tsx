import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import ArticlePage from './pages/ArticlePage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-inter">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/learning/:slug" element={<ArticlePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;