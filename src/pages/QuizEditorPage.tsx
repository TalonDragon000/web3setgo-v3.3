import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react';
import { useQuizById } from '../hooks/useQuizBySlug';
import { useQuizMutations } from '../hooks/useQuizMutations';
import { useToast } from '../hooks/useToast';
import { useAdmin } from '../contexts/AdminContext';
import QuizQuestionBuilder from '../components/QuizQuestionBuilder';
import JsonEditor from '../components/JsonEditor';
import IconSelector from '../components/IconSelector';
import ColorSchemeSelector from '../components/ColorSchemeSelector';
import Toast from '../components/Toast';
import AdminLogin from '../components/admin/AdminLogin';
import { slugify } from '../utils/slugify';

const QuizEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewQuiz = id === 'new';
  
  const { quiz, loading: quizLoading } = useQuizById(isNewQuiz ? undefined : id);
  const { createQuiz, updateQuiz, deleteQuiz, checkSlugExists, loading: mutationLoading } = useQuizMutations();
  const { toasts, showToast, removeToast } = useToast();
  const { isAdmin, isLoading: adminLoading } = useAdmin();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [editedQuiz, setEditedQuiz] = useState({
    title: '',
    description: '',
    slug: '',
    quiz_type: 'personality' as 'knowledge' | 'personality',
    icon: 'Target',
    color_scheme: 'from-mint-500 to-ocean-500',
    questions: [] as any[],
    result_categories: {},
    passing_score: 70,
    published: true,
    order_index: 0,
  });

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      setShowLoginModal(true);
    }
  }, [isAdmin, adminLoading]);

  useEffect(() => {
    if (quiz && !isNewQuiz) {
      setEditedQuiz({
        title: quiz.title,
        description: quiz.description,
        slug: quiz.slug || '',
        quiz_type: (quiz.quiz_type as 'knowledge' | 'personality') || 'personality',
        icon: quiz.icon || 'Target',
        color_scheme: quiz.color_scheme || 'from-mint-500 to-ocean-500',
        questions: typeof quiz.questions === 'string' ? JSON.parse(quiz.questions) : (quiz.questions || []),
        result_categories: typeof quiz.result_categories === 'string' ? JSON.parse(quiz.result_categories) : (quiz.result_categories || {}),
        passing_score: quiz.passing_score || 70,
        published: quiz.published,
        order_index: quiz.order_index || 0,
      });
    }
  }, [quiz, isNewQuiz]);

  useEffect(() => {
    if (!quiz || isNewQuiz) return;

    const hasChanges =
      editedQuiz.title !== quiz.title ||
      editedQuiz.description !== quiz.description ||
      editedQuiz.slug !== (quiz.slug || '') ||
      editedQuiz.quiz_type !== quiz.quiz_type ||
      editedQuiz.icon !== quiz.icon ||
      editedQuiz.color_scheme !== quiz.color_scheme ||
      JSON.stringify(editedQuiz.questions) !== JSON.stringify(quiz.questions) ||
      JSON.stringify(editedQuiz.result_categories) !== JSON.stringify(quiz.result_categories) ||
      editedQuiz.passing_score !== quiz.passing_score ||
      editedQuiz.published !== quiz.published;

    setHasUnsavedChanges(hasChanges);
  }, [editedQuiz, quiz, isNewQuiz]);

  const handleSlugGeneration = () => {
    const newSlug = slugify(editedQuiz.title);
    setEditedQuiz({ ...editedQuiz, slug: newSlug });
  };

  const handleSave = async () => {
    if (!editedQuiz.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (!editedQuiz.description.trim()) {
      showToast('Description is required', 'error');
      return;
    }

    if (!editedQuiz.slug.trim()) {
      showToast('Slug is required', 'error');
      return;
    }

    if (editedQuiz.questions.length === 0) {
      showToast('At least one question is required', 'error');
      return;
    }

    // Check slug uniqueness
    if (isNewQuiz || editedQuiz.slug !== quiz?.slug) {
      const slugExists = await checkSlugExists(editedQuiz.slug, quiz?.id);
      if (slugExists) {
        showToast('This slug is already in use. Please choose another.', 'error');
        return;
      }
    }

    const quizData = {
      ...editedQuiz,
      questions: editedQuiz.questions,
      result_categories: editedQuiz.result_categories,
    };

    let result;
    if (isNewQuiz) {
      result = await createQuiz(quizData);
    } else if (quiz) {
      result = await updateQuiz(quiz.id, quizData);
    }

    if (result) {
      showToast(isNewQuiz ? 'Quiz created successfully!' : 'Quiz updated successfully!', 'success');
      setHasUnsavedChanges(false);
      
      if (isNewQuiz) {
        setTimeout(() => navigate(`/quizzes/${result.id}/edit`), 1000);
      } else {
        setTimeout(() => window.location.reload(), 1000);
      }
    } else {
      showToast(`Failed to ${isNewQuiz ? 'create' : 'update'} quiz`, 'error');
    }
  };

  const handleDelete = async () => {
    if (!quiz || isNewQuiz) return;

    const result = await deleteQuiz(quiz.id);

    if (result) {
      showToast('Quiz deleted successfully!', 'success');
      setTimeout(() => navigate('/quizzes'), 1000);
    } else {
      showToast('Failed to delete quiz', 'error');
    }

    setShowDeleteConfirm(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        return;
      }
    }
    navigate('/quizzes');
  };

  if (adminLoading || (quizLoading && !isNewQuiz)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return showLoginModal ? (
      <AdminLogin
        onClose={() => navigate('/quizzes')}
        onSuccess={() => setShowLoginModal(false)}
      />
    ) : null;
  }

  if (!quiz && !isNewQuiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
          <Link to="/quizzes" className="text-ocean-500 hover:text-ocean-600 font-medium">
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this quiz? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={mutationLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              >
                {mutationLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/quizzes"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Quizzes
            </Link>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCancel}
                disabled={mutationLoading}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={mutationLoading || (!isNewQuiz && !hasUnsavedChanges)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {mutationLoading ? 'Saving...' : 'Save'}
              </button>
              {!isNewQuiz && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={mutationLoading}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {isNewQuiz ? 'Create New Quiz' : 'Edit Quiz'}
          </h1>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editedQuiz.title}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Enter quiz title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                    <button
                      type="button"
                      onClick={handleSlugGeneration}
                      className="ml-2 text-xs text-ocean-500 hover:text-ocean-600"
                    >
                      Generate from title
                    </button>
                  </label>
                  <input
                    type="text"
                    value={editedQuiz.slug}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="quiz-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editedQuiz.description}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Brief description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Type</label>
                    <select
                      value={editedQuiz.quiz_type}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, quiz_type: e.target.value as 'knowledge' | 'personality' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    >
                      <option value="personality">Personality</option>
                      <option value="knowledge">Knowledge</option>
                    </select>
                  </div>

                  {editedQuiz.quiz_type === 'knowledge' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                      <input
                        type="number"
                        value={editedQuiz.passing_score}
                        onChange={(e) => setEditedQuiz({ ...editedQuiz, passing_score: parseInt(e.target.value) || 70 })}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                <IconSelector
                  value={editedQuiz.icon}
                  onChange={(icon) => setEditedQuiz({ ...editedQuiz, icon })}
                  label="Icon"
                />

                <ColorSchemeSelector
                  value={editedQuiz.color_scheme}
                  onChange={(color_scheme) => setEditedQuiz({ ...editedQuiz, color_scheme })}
                  label="Color Scheme"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editedQuiz.published}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, published: e.target.checked })}
                    className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    {editedQuiz.published ? 'Published' : 'Draft'}
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Questions</h2>
              <QuizQuestionBuilder
                questions={editedQuiz.questions}
                onChange={(questions) => setEditedQuiz({ ...editedQuiz, questions })}
                quizType={editedQuiz.quiz_type}
              />
            </div>

            {editedQuiz.quiz_type === 'personality' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Result Categories</h2>
                <JsonEditor
                  value={editedQuiz.result_categories}
                  onChange={(result_categories) => setEditedQuiz({ ...editedQuiz, result_categories })}
                  label="Category results in JSON format"
                  placeholder='{"category": {"title": "Title", "description": "Description", "advice": "Advice"}}'
                  minRows={10}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Define result categories that match the categories used in your questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizEditorPage;

