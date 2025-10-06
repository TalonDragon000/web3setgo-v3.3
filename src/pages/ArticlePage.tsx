import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard as Edit, Save, X, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBlogBySlug } from '../hooks/useBlogBySlug';
import { useBlogMutations } from '../hooks/useBlogMutations';
import { useToast } from '../hooks/useToast';
import MarkdownEditor from '../components/MarkdownEditor';
import Toast from '../components/Toast';
import { slugify } from '../utils/slugify';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, loading: blogLoading } = useBlogBySlug(slug);
  const { updateBlog, deleteBlog, checkSlugExists, loading: mutationLoading } = useBlogMutations();
  const { toasts, showToast, removeToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    difficulty: '',
    read_time: '',
    image_url: '',
    published: true,
    slug: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (blog) {
      setEditedBlog({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        category: blog.category,
        difficulty: blog.difficulty,
        read_time: blog.read_time,
        image_url: blog.image_url,
        published: blog.published,
        slug: blog.slug,
      });
    }
  }, [blog]);

  useEffect(() => {
    if (!blog || !isEditing) return;

    const hasChanges =
      editedBlog.title !== blog.title ||
      editedBlog.description !== blog.description ||
      editedBlog.content !== blog.content ||
      editedBlog.category !== blog.category ||
      editedBlog.difficulty !== blog.difficulty ||
      editedBlog.read_time !== blog.read_time ||
      editedBlog.image_url !== blog.image_url ||
      editedBlog.published !== blog.published ||
      editedBlog.slug !== blog.slug;

    setHasUnsavedChanges(hasChanges);
  }, [editedBlog, blog, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        return;
      }
    }

    if (blog) {
      setEditedBlog({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        category: blog.category,
        difficulty: blog.difficulty,
        read_time: blog.read_time,
        image_url: blog.image_url,
        published: blog.published,
        slug: blog.slug,
      });
    }
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const handleSave = async () => {
    if (!blog) return;

    if (!editedBlog.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (!editedBlog.description.trim()) {
      showToast('Description is required', 'error');
      return;
    }

    if (!editedBlog.slug.trim()) {
      showToast('Slug is required', 'error');
      return;
    }

    if (editedBlog.slug !== blog.slug) {
      const slugExists = await checkSlugExists(editedBlog.slug, blog.id);
      if (slugExists) {
        showToast('This slug is already in use. Please choose another.', 'error');
        return;
      }
    }

    const result = await updateBlog(blog.id, editedBlog);

    if (result) {
      showToast('Blog updated successfully!', 'success');
      setIsEditing(false);
      setHasUnsavedChanges(false);

      if (editedBlog.slug !== blog.slug) {
        navigate(`/blogs/${editedBlog.slug}`, { replace: true });
      } else {
        window.location.reload();
      }
    } else {
      showToast('Failed to update blog', 'error');
    }
  };

  const handleDelete = async () => {
    if (!blog) return;

    const result = await deleteBlog(blog.id);

    if (result) {
      showToast('Blog deleted successfully!', 'success');
      setTimeout(() => navigate('/blogs'), 1000);
    } else {
      showToast('Failed to delete blog', 'error');
    }

    setShowDeleteConfirm(false);
  };

  const handleSlugGeneration = () => {
    const newSlug = slugify(editedBlog.title);
    setEditedBlog({ ...editedBlog, slug: newSlug });
  };

  if (blogLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link to="/blogs" className="text-ocean-500 hover:text-ocean-600 font-medium">
            ← Back to Blogs
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
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
              ) : (
                <>
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
                    disabled={mutationLoading || !hasUnsavedChanges}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {mutationLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={mutationLoading}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
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

      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editedBlog.title}
                  onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="Blog title"
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
                  value={editedBlog.slug}
                  onChange={(e) => setEditedBlog({ ...editedBlog, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="blog-post-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editedBlog.description}
                  onChange={(e) => setEditedBlog({ ...editedBlog, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="Brief description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={editedBlog.category}
                    onChange={(e) => setEditedBlog({ ...editedBlog, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="e.g., Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={editedBlog.difficulty}
                    onChange={(e) => setEditedBlog({ ...editedBlog, difficulty: e.target.value })}
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
                    value={editedBlog.read_time}
                    onChange={(e) => setEditedBlog({ ...editedBlog, read_time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="e.g., 5 min read"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published
                  </label>
                  <div className="flex items-center h-full">
                    <input
                      type="checkbox"
                      checked={editedBlog.published}
                      onChange={(e) => setEditedBlog({ ...editedBlog, published: e.target.checked })}
                      className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {editedBlog.published ? 'Published' : 'Draft'}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={editedBlog.image_url}
                  onChange={(e) => setEditedBlog({ ...editedBlog, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {editedBlog.image_url && (
                  <div className="mt-2 aspect-video rounded-lg overflow-hidden">
                    <img
                      src={editedBlog.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/nova-come-trans.png';
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
                  value={editedBlog.content}
                  onChange={(value) => setEditedBlog({ ...editedBlog, content: value })}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-mint-100 to-ocean-100 text-ocean-800 text-sm font-medium rounded-full mb-4">
                  {blog.category}
                </span>
                {!blog.published && (
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mb-4 ml-2">
                    Draft
                  </span>
                )}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{blog.description}</p>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/nova-come-trans.png';
                  }}
                />
              </div>

              <div className="prose prose-xl prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
