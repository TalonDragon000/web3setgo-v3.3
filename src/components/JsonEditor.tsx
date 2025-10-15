import React, { useState, useEffect } from 'react';
import { AlertCircle, Eye, Edit3 } from 'lucide-react';

interface JsonEditorProps {
  value: string | object;
  onChange: (value: object) => void;
  label?: string;
  placeholder?: string;
  minRows?: number;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = '{}',
  minRows = 5,
}) => {
  const [jsonString, setJsonString] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    try {
      const formatted = typeof value === 'string' 
        ? value 
        : JSON.stringify(value, null, 2);
      setJsonString(formatted);
    } catch (err) {
      setJsonString(placeholder);
    }
  }, [value, placeholder]);

  const handleChange = (newValue: string) => {
    setJsonString(newValue);
    
    try {
      const parsed = JSON.parse(newValue);
      setError(null);
      onChange(parsed);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON');
      }
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {error ? (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{error}</span>
              </div>
            ) : (
              <span className="text-xs text-success-600">Valid JSON</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-3 py-1 text-xs rounded transition-colors duration-200 flex items-center gap-1 ${
                !showPreview
                  ? 'bg-ocean-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Edit3 className="h-3 w-3" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              disabled={!!error}
              className={`px-3 py-1 text-xs rounded transition-colors duration-200 flex items-center gap-1 ${
                showPreview
                  ? 'bg-ocean-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>
        </div>

        <div className="p-4 bg-white">
          {!showPreview ? (
            <textarea
              value={jsonString}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
              rows={minRows}
              className="w-full resize-y focus:outline-none font-mono text-sm leading-relaxed text-gray-900 border-0 p-0"
            />
          ) : (
            <pre className="font-mono text-xs text-gray-900 overflow-x-auto whitespace-pre-wrap">
              {jsonString}
            </pre>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        JSON format required. Use double quotes for strings.
      </p>
    </div>
  );
};

export default JsonEditor;

