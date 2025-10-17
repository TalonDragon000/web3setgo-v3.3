import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ColorSchemeSelectorProps {
  value: string;
  onChange: (colorScheme: string) => void;
  label?: string;
}

// Predefined Tailwind gradient options
const colorSchemes = [
  { name: 'Mint to Ocean', value: 'from-mint-500 to-ocean-500' },
  { name: 'Success to Mint', value: 'from-success-500 to-mint-500' },
  { name: 'Yellow to Orange', value: 'from-accentYellow-500 to-orange-500' },
  { name: 'Ocean to Blue', value: 'from-ocean-500 to-blue-500' },
  { name: 'Purple to Pink', value: 'from-purple-500 to-pink-500' },
  { name: 'Green to Teal', value: 'from-green-500 to-teal-500' },
  { name: 'Red to Orange', value: 'from-red-500 to-orange-500' },
  { name: 'Indigo to Purple', value: 'from-indigo-500 to-purple-500' },
  { name: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
  { name: 'Gray to Slate', value: 'from-gray-500 to-slate-500' },
];

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  value,
  onChange,
  label,
}) => {
  const [customValue, setCustomValue] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const isCustom = !colorSchemes.some(scheme => scheme.value === value);

  const handlePresetSelect = (schemeValue: string) => {
    onChange(schemeValue);
    setShowCustom(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.value}
            type="button"
            onClick={() => handlePresetSelect(scheme.value)}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
              value === scheme.value
                ? 'border-ocean-500'
                : 'border-gray-200 hover:border-ocean-300'
            }`}
          >
            <div className={`h-16 rounded-lg bg-gradient-to-r ${scheme.value} mb-2`} />
            <span className="text-xs text-gray-700 text-center block">
              {scheme.name}
            </span>
            {value === scheme.value && (
              <div className="absolute top-2 right-2 bg-ocean-500 text-white rounded-full p-1">
                <Check className="h-3 w-3" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="pt-3 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
        >
          {showCustom ? '− Hide Custom' : '+ Use Custom Gradient'}
        </button>

        {showCustom && (
          <div className="mt-3 space-y-2">
            <input
              type="text"
              value={isCustom ? value : customValue}
              onChange={handleCustomChange}
              placeholder="e.g., from-blue-500 to-purple-500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm"
            />
            <p className="text-xs text-gray-500">
              Use Tailwind gradient classes (e.g., from-color-shade to-color-shade)
            </p>
            {(isCustom ? value : customValue) && (
              <div className="p-3 border border-gray-300 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Preview:</p>
                <div className={`h-12 rounded-lg bg-gradient-to-r ${isCustom ? value : customValue}`} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSchemeSelector;

