import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  value?: number;
  category?: string;
  correct?: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizQuestionBuilderProps {
  questions: QuizQuestion[];
  onChange: (questions: QuizQuestion[]) => void;
  quizType: 'knowledge' | 'personality';
}

const QuizQuestionBuilder: React.FC<QuizQuestionBuilderProps> = ({
  questions,
  onChange,
  quizType,
}) => {
  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q${Date.now()}`,
      question: '',
      options: [
        { id: `opt${Date.now()}_1`, text: '', ...(quizType === 'personality' ? { value: 0, category: '' } : { correct: 0 }) },
        { id: `opt${Date.now()}_2`, text: '', ...(quizType === 'personality' ? { value: 0, category: '' } : { correct: 0 }) },
      ],
    };
    onChange([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    onChange(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, updates: Partial<QuizQuestion>) => {
    onChange(questions.map(q => q.id === questionId ? { ...q, ...updates } : q));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const newOption: QuizOption = {
      id: `opt${Date.now()}`,
      text: '',
      ...(quizType === 'personality' ? { value: 0, category: '' } : { correct: 0 })
    };

    updateQuestion(questionId, {
      options: [...question.options, newOption],
    });
  };

  const removeOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || question.options.length <= 2) return;

    updateQuestion(questionId, {
      options: question.options.filter(opt => opt.id !== optionId),
    });
  };

  const updateOption = (questionId: string, optionId: string, updates: Partial<QuizOption>) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    updateQuestion(questionId, {
      options: question.options.map(opt => opt.id === optionId ? { ...opt, ...updates } : opt),
    });
  };

  const markAsCorrect = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    updateQuestion(questionId, {
      options: question.options.map(opt => ({
        ...opt,
        correct: opt.id === optionId ? 1 : 0,
      })),
    });
  };

  return (
    <div className="space-y-6">
      {questions.map((question, qIndex) => (
        <div key={question.id} className="border border-gray-300 rounded-lg p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-1">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
              <span className="text-sm font-semibold text-gray-700">Question {qIndex + 1}</span>
            </div>
            <button
              type="button"
              onClick={() => removeQuestion(question.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <input
            type="text"
            value={question.question}
            onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
            placeholder="Enter your question"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent mb-4"
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {question.options.map((option, optIndex) => (
              <div key={option.id} className="flex items-start gap-2">
                {quizType === 'knowledge' && (
                  <input
                    type="radio"
                    checked={option.correct === 1}
                    onChange={() => markAsCorrect(question.id, option.id)}
                    className="mt-3 h-4 w-4 text-ocean-600"
                    title="Mark as correct answer"
                  />
                )}
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOption(question.id, option.id, { text: e.target.value })}
                    placeholder={`Option ${optIndex + 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />

                  {quizType === 'personality' && (
                    <>
                      <input
                        type="number"
                        value={option.value || 0}
                        onChange={(e) => updateOption(question.id, option.id, { value: parseInt(e.target.value) || 0 })}
                        placeholder="Value"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={option.category || ''}
                        onChange={(e) => updateOption(question.id, option.id, { category: e.target.value })}
                        placeholder="Category"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent sm:col-span-2"
                      />
                    </>
                  )}
                </div>

                {question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(question.id, option.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addOption(question.id)}
              className="text-sm text-ocean-600 hover:text-ocean-700 font-medium flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Option
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-ocean-500 hover:text-ocean-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Question
      </button>
    </div>
  );
};

export default QuizQuestionBuilder;

