import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface SimulationStep {
  id: string;
  step_order: number;
  title: string;
  description: string;
  hints: string[];
}

interface SimulationStepEditorProps {
  steps: SimulationStep[];
  onChange: (steps: SimulationStep[]) => void;
}

const SimulationStepEditor: React.FC<SimulationStepEditorProps> = ({
  steps,
  onChange,
}) => {
  const addStep = () => {
    const newStep: SimulationStep = {
      id: `temp_${Date.now()}`,
      step_order: steps.length,
      title: '',
      description: '',
      hints: [],
    };
    onChange([...steps, newStep]);
  };

  const removeStep = (stepId: string) => {
    const updatedSteps = steps
      .filter(s => s.id !== stepId)
      .map((s, index) => ({ ...s, step_order: index }));
    onChange(updatedSteps);
  };

  const updateStep = (stepId: string, updates: Partial<SimulationStep>) => {
    onChange(steps.map(s => s.id === stepId ? { ...s, ...updates } : s));
  };

  const addHint = (stepId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    updateStep(stepId, {
      hints: [...step.hints, ''],
    });
  };

  const removeHint = (stepId: string, hintIndex: number) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    updateStep(stepId, {
      hints: step.hints.filter((_, index) => index !== hintIndex),
    });
  };

  const updateHint = (stepId: string, hintIndex: number, value: string) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    const newHints = [...step.hints];
    newHints[hintIndex] = value;
    updateStep(stepId, { hints: newHints });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    // Update step_order
    const reorderedSteps = newSteps.map((step, idx) => ({ ...step, step_order: idx }));
    onChange(reorderedSteps);
  };

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={step.id} className="border border-gray-300 rounded-lg p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="text-xs">▲</span>
                </button>
                <GripVertical className="h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => moveStep(index, 'down')}
                  disabled={index === steps.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="text-xs">▼</span>
                </button>
              </div>
              <span className="text-sm font-semibold text-gray-700">Step {index + 1}</span>
            </div>
            <button
              type="button"
              onClick={() => removeStep(step.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Step Title</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateStep(step.id, { title: e.target.value })}
                placeholder="Enter step title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Markdown supported)
              </label>
              <textarea
                value={step.description}
                onChange={(e) => updateStep(step.id, { description: e.target.value })}
                placeholder="Enter step description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Hints</label>
                <button
                  type="button"
                  onClick={() => addHint(step.id)}
                  className="text-sm text-ocean-600 hover:text-ocean-700 font-medium flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Hint
                </button>
              </div>
              
              {step.hints.length > 0 ? (
                <div className="space-y-2">
                  {step.hints.map((hint, hintIndex) => (
                    <div key={hintIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={hint}
                        onChange={(e) => updateHint(step.id, hintIndex, e.target.value)}
                        placeholder={`Hint ${hintIndex + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeHint(step.id, hintIndex)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No hints added yet</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addStep}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-ocean-500 hover:text-ocean-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Step
      </button>
    </div>
  );
};

export default SimulationStepEditor;

