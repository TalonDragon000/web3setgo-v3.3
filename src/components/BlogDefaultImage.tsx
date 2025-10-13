import React from 'react';
import { BookOpen, Code, Newspaper, FileText } from 'lucide-react';

interface BlogDefaultImageProps {
  type: string;
  className?: string;
}

const BlogDefaultImage: React.FC<BlogDefaultImageProps> = ({ type, className = '' }) => {
  const getIcon = () => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-24 h-24 text-white" strokeWidth={1.5} />;
      case 'devlog':
        return <Code className="w-24 h-24 text-white" strokeWidth={1.5} />;
      case 'news':
        return <Megaphone className="w-24 h-24 text-white" strokeWidth={1.5} />;
      case 'article':
      default:
        return <FileText className="w-24 h-24 text-white" strokeWidth={1.5} />;
    }
  };

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-mint-500 via-mint-400 to-ocean-500 ${className}`}
    >
      {getIcon()}
    </div>
  );
};

export default BlogDefaultImage;
