import React, { useState } from 'react';
import { 
  Target, Briefcase, TrendingUp, BookOpen, Zap, Wallet, Code, 
  Cpu, Lock, Shield, Sparkles, Play, Award, Trophy, Coins,
  Database, Globe, Layers, Network, Package, Settings,
  Star, Check, X, Search
} from 'lucide-react';

interface IconSelectorProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

// Available icons mapping
const availableIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Briefcase,
  TrendingUp,
  BookOpen,
  Zap,
  Wallet,
  Code,
  Cpu,
  Lock,
  Shield,
  Sparkles,
  Play,
  Award,
  Trophy,
  Coins,
  Database,
  Globe,
  Layers,
  Network,
  Package,
  Settings,
  Star,
};

const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const SelectedIcon = availableIcons[value] || BookOpen;

  const filteredIcons = Object.entries(availableIcons).filter(([name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <SelectedIcon className="h-5 w-5 text-ocean-600" />
            <span className="text-gray-900">{value}</span>
          </div>
          <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search icons..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto p-2 grid grid-cols-4 gap-2">
              {filteredIcons.map(([iconName, IconComponent]) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => handleSelect(iconName)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 hover:bg-ocean-50 ${
                    value === iconName
                      ? 'border-ocean-500 bg-ocean-50'
                      : 'border-gray-200'
                  }`}
                >
                  <IconComponent className="h-6 w-6 text-ocean-600" />
                  <span className="text-xs text-gray-600 truncate w-full text-center">
                    {iconName}
                  </span>
                </button>
              ))}
            </div>

            {filteredIcons.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                No icons found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelector;

