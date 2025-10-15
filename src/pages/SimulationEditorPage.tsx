import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react';
import { useSimulationBySlug } from '../hooks/useSimulationBySlug';
import { useSimulationMutations } from '../hooks/useSimulationMutations';
import { useSimulationSteps } from '../hooks/useSimulationSteps';
import { useToast } from '../hooks/useToast';
import { useAdmin } from '../contexts/AdminContext';
import SimulationStepEditor from '../components/SimulationStepEditor';
import IconSelector from '../components/IconSelector';
import ColorSchemeSelector from '../components/ColorSchemeSelector';
import Toast from '../components/Toast';
import AdminLogin from '../components/admin/AdminLogin';
import { slugify } from '../utils/slugify';
import { getAvailableComponentTypes } from '../components/simulations/SimulationRegistry';

const SimulationEditorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isNewSimulation = slug === 'new';
  
  const { simulation, loading: simulationLoading } = useSimulationBySlug(isNewSimulation ? undefined : slug);
  const { createSimulation, updateSimulation, deleteSimulation, checkSlugExists, loading: mutationLoading } = useSimulationMutations();
  const { createStep, updateStep, deleteStep } = useSimulationSteps();
  const { toasts, showToast, removeToast } = useToast();
  const { isAdmin, isLoading: adminLoading } = useAdmin();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [editedSimulation, setEditedSimulation] = useState({
    slug: '',
    title: '',
    description: '',
    category: 'General',
    difficulty: 'Beginner',
    duration: '10-15 min',
    component_type: 'wallet-creation',
    icon: 'Zap',
    color_scheme: 'from-mint-500 to-ocean-500',
    order_index: 0,
    published: true,
  });

  const [steps, setSteps] = useState<any[]>([]);
  const availableComponentTypes = getAvailableComponentTypes();

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      setShowLoginModal(true);
    }
  }, [isAdmin, adminLoading]);

  useEffect(() => {
    if (simulation && !isNewSimulation) {
      setEditedSimulation({
        slug: simulation.slug,
        title: simulation.title,
        description: simulation.description,
        category: simulation.category,
        difficulty: simulation.difficulty,
        duration: simulation.duration,
        component_type: simulation.component_type,
        icon: simulation.icon,
        color_scheme: simulation.color_scheme,
        order_index: simulation.order_index,
        published: simulation.published,
      });
      setSteps(simulation.steps || []);
    }
  }, [simulation, isNewSimulation]);

  useEffect(() => {
    if (!simulation || isNewSimulation) return;

    const hasChanges =
      editedSimulation.slug !== simulation.slug ||
      editedSimulation.title !== simulation.title ||
      editedSimulation.description !== simulation.description ||
      editedSimulation.category !== simulation.category ||
      editedSimulation.difficulty !== simulation.difficulty ||
      editedSimulation.duration !== simulation.duration ||
      editedSimulation.component_type !== simulation.component_type ||
      editedSimulation.icon !== simulation.icon ||
      editedSimulation.color_scheme !== simulation.color_scheme ||
      editedSimulation.published !== simulation.published ||
      JSON.stringify(steps) !== JSON.stringify(simulation.steps);

    setHasUnsavedChanges(hasChanges);
  }, [editedSimulation, steps, simulation, isNewSimulation]);

  const handleSlugGeneration = () => {
    const newSlug = slugify(editedSimulation.title);
    setEditedSimulation({ ...editedSimulation, slug: newSlug });
  };

  const handleSave = async () => {
    if (!editedSimulation.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (!editedSimulation.description.trim()) {
      showToast('Description is required', 'error');
      return;
    }

    if (!editedSimulation.slug.trim()) {
      showToast('Slug is required', 'error');
      return;
    }

    if (steps.length === 0) {
      showToast('At least one step is required', 'error');
      return;
    }

    // Check slug uniqueness
    if (isNewSimulation || editedSimulation.slug !== simulation?.slug) {
      const slugExists = await checkSlugExists(editedSimulation.slug, simulation?.id);
      if (slugExists) {
        showToast('This slug is already in use. Please choose another.', 'error');
        return;
      }
    }

    let result;
    if (isNewSimulation) {
      result = await createSimulation(editedSimulation);
      
      if (result) {
        // Create steps for new simulation
        for (const step of steps) {
          await createStep(result.id, {
            step_order: step.step_order,
            title: step.title,
            description: step.description,
            hints: step.hints,
          });
        }
      }
    } else if (simulation) {
      result = await updateSimulation(simulation.id, editedSimulation);
      
      if (result) {
        // Update existing steps and create new ones
        for (const step of steps) {
          if (step.id.startsWith('temp_')) {
            // New step
            await createStep(simulation.id, {
              step_order: step.step_order,
              title: step.title,
              description: step.description,
              hints: step.hints,
            });
          } else {
            // Existing step
            await updateStep(step.id, {
              step_order: step.step_order,
              title: step.title,
              description: step.description,
              hints: step.hints,
            });
          }
        }

        // Delete steps that were removed
        const currentStepIds = steps.map(s => s.id);
        const originalStepIds = simulation.steps?.map(s => s.id) || [];
        const deletedStepIds = originalStepIds.filter(id => !currentStepIds.includes(id));
        
        for (const stepId of deletedStepIds) {
          await deleteStep(stepId);
        }
      }
    }

    if (result) {
      showToast(isNewSimulation ? 'Simulation created successfully!' : 'Simulation updated successfully!', 'success');
      setHasUnsavedChanges(false);
      
      if (isNewSimulation) {
        setTimeout(() => navigate(`/simulations/${result.slug}/edit`), 1000);
      } else {
        setTimeout(() => window.location.reload(), 1000);
      }
    } else {
      showToast(`Failed to ${isNewSimulation ? 'create' : 'update'} simulation`, 'error');
    }
  };

  const handleDelete = async () => {
    if (!simulation || isNewSimulation) return;

    const result = await deleteSimulation(simulation.id);

    if (result) {
      showToast('Simulation deleted successfully!', 'success');
      setTimeout(() => navigate('/simulations'), 1000);
    } else {
      showToast('Failed to delete simulation', 'error');
    }

    setShowDeleteConfirm(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        return;
      }
    }
    navigate('/simulations');
  };

  if (adminLoading || (simulationLoading && !isNewSimulation)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return showLoginModal ? (
      <AdminLogin
        onClose={() => navigate('/simulations')}
        onSuccess={() => setShowLoginModal(false)}
      />
    ) : null;
  }

  if (!simulation && !isNewSimulation) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Simulation Not Found</h1>
          <Link to="/simulations" className="text-ocean-500 hover:text-ocean-600 font-medium">
            ← Back to Simulations
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
              Are you sure you want to delete this simulation? This action cannot be undone.
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
              to="/simulations"
              className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Simulations
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
                disabled={mutationLoading || (!isNewSimulation && !hasUnsavedChanges)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {mutationLoading ? 'Saving...' : 'Save'}
              </button>
              {!isNewSimulation && (
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
            {isNewSimulation ? 'Create New Simulation' : 'Edit Simulation'}
          </h1>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editedSimulation.title}
                    onChange={(e) => setEditedSimulation({ ...editedSimulation, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Enter simulation title"
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
                    value={editedSimulation.slug}
                    onChange={(e) => setEditedSimulation({ ...editedSimulation, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="simulation-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editedSimulation.description}
                    onChange={(e) => setEditedSimulation({ ...editedSimulation, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Brief description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={editedSimulation.category}
                      onChange={(e) => setEditedSimulation({ ...editedSimulation, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      placeholder="e.g., Wallets, DeFi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={editedSimulation.difficulty}
                      onChange={(e) => setEditedSimulation({ ...editedSimulation, difficulty: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={editedSimulation.duration}
                      onChange={(e) => setEditedSimulation({ ...editedSimulation, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      placeholder="e.g., 10-15 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Component Type</label>
                  <select
                    value={editedSimulation.component_type}
                    onChange={(e) => setEditedSimulation({ ...editedSimulation, component_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  >
                    {availableComponentTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Select the React component that will render this simulation
                  </p>
                </div>

                <IconSelector
                  value={editedSimulation.icon}
                  onChange={(icon) => setEditedSimulation({ ...editedSimulation, icon })}
                  label="Icon"
                />

                <ColorSchemeSelector
                  value={editedSimulation.color_scheme}
                  onChange={(color_scheme) => setEditedSimulation({ ...editedSimulation, color_scheme })}
                  label="Color Scheme"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editedSimulation.published}
                    onChange={(e) => setEditedSimulation({ ...editedSimulation, published: e.target.checked })}
                    className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    {editedSimulation.published ? 'Published' : 'Draft'}
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Simulation Steps</h2>
              <SimulationStepEditor
                steps={steps}
                onChange={setSteps}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationEditorPage;

