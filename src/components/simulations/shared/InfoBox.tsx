import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface InfoBoxProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ type, title, children }) => {
  const config = {
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-ocean-500',
      textColor: 'text-gray-700',
      titleColor: 'text-ocean-900',
      icon: Info,
      iconColor: 'text-ocean-600',
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-accentYellow-500',
      textColor: 'text-gray-700',
      titleColor: 'text-accentYellow-900',
      icon: AlertTriangle,
      iconColor: 'text-accentYellow-600',
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-success-500',
      textColor: 'text-gray-700',
      titleColor: 'text-success-900',
      icon: CheckCircle,
      iconColor: 'text-success-600',
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-gray-700',
      titleColor: 'text-red-900',
      icon: AlertCircle,
      iconColor: 'text-red-600',
    },
  };

  const { bgColor, borderColor, textColor, titleColor, icon: Icon, iconColor } = config[type];

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-r-lg`}>
      <div className="flex">
        <Icon className={`h-5 w-5 ${iconColor} mr-3 mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${titleColor} mb-2`}>{title}</h4>
          )}
          <div className={`text-sm ${textColor} leading-relaxed`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;

