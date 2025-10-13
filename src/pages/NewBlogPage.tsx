import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useBlogMutations } from '../hooks/useBlogMutations';
import { useToast } from '../hooks/useToast';
import MarkdownEditor from '../components/MarkdownEditor';
import Toast from '../components/Toast';
import { slugify } from '../utils/slugify';
import { calculateReadTime } from '../utils/readTime';

const NewBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { createBlog, checkSlugExists, loading } = useBlogMutations();
  const { toasts, showToast, removeToast } = useToast();

  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    content: '# Your Blog Title\n\nStart writing your content here...',
    category: 'General',
    difficulty: 'Beginner',
    type: 'article',
    read_time: '1 min read',
    image_url: '/blog-bg.png',
    published: true,
    slug: '',
  });

  React.useEffect(() => {
    const readTime = calculateReadTime(newBlog.content);
    setNewBlog(prev => ({ ...prev, read_time: readTime }));
  }, [newBlog.content]);

  const handleSlugGeneration = () => {
    const generatedSlug = slugify(newBlog.title);
    setNewBlog({ ...newBlog, slug: generatedSlug });
  };

  const handleCreate = async () => {
    if (!newBlog.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (!newBlog.description.trim()) {
      showToast('Description is required', 'error');
      return;
    }

    if (!newBlog.slug.trim()) {
      showToast('Slug is required', 'error');
      return;
    }

    const slugExists = await checkSlugExists(newBlog.slug);
    if (slugExists) {
      showToast('This slug is already in use. Please choose another.', 'error');
      return;
    }

    const result = await createBlog(newBlog);

    if (result) {
      showToast('Blog created successfully!', 'success');
      setTimeout(() => navigate(`/blogs/${result.slug}`), 1000);
    } else {
      showToast('Failed to create blog', 'error');
    }
  };

  const handleCancel = () => {
    if (
      newBlog.title ||
      newBlog.description !== '' ||
      newBlog.content !== '# Your Blog Title\n\nStart writing your content here...'
    ) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        return;
      }
    }
    navigate('/blogs');
  };

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

      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/blogs"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blogs
            </Link>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Creating...' : 'Create Blog'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="Enter blog title"
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
                value={newBlog.slug}
                onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="blog-post-slug"
              />
              <p className="mt-1 text-xs text-gray-500">
                URL-friendly version of the title (e.g., my-awesome-blog-post)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newBlog.description}
                onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="Brief description of your blog post"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newBlog.type}
                  onChange={(e) => setNewBlog({ ...newBlog, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                >
                  <option value="lesson">Lesson</option>
                  <option value="devlog">Dev Log</option>
                  <option value="news">News</option>
                  <option value="article">Article</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="e.g., Technology, Basics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={newBlog.difficulty}
                  onChange={(e) => setNewBlog({ ...newBlog, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                <input
                  type="text"
                  value={newBlog.read_time}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  title="Auto-calculated based on content length"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-calculated from content</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Status
                </label>
                <div className="flex items-center h-full">
                  <input
                    type="checkbox"
                    checked={newBlog.published}
                    onChange={(e) => setNewBlog({ ...newBlog, published: e.target.checked })}
                    className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    {newBlog.published ? 'Published' : 'Save as Draft'}
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={newBlog.image_url}
                onChange={(e) => setNewBlog({ ...newBlog, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {newBlog.image_url && (
                <div className="mt-2 aspect-video rounded-lg overflow-hidden">
                  <img
                    src={newBlog.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/blog-bg.png';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (Markdown)
              </label>
              <MarkdownEditor
                value={newBlog.content}
                onChange={(value) => setNewBlog({ ...newBlog, content: value })}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBlogPage;
