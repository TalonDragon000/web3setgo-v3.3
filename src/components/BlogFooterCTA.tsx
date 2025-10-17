import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useFooterTarget } from '../hooks/useFooterTarget';

interface BlogFooterCTAProps {
  footerType: string | null;
  targetSlug: string | null;
}

const BlogFooterCTA: React.FC<BlogFooterCTAProps> = ({ footerType, targetSlug }) => {
  const { target, loading } = useFooterTarget({ footerType, targetSlug });

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-24 bg-gray-100 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!target || !footerType || !targetSlug) {
    return null;
  }

  const isBlogType = footerType === 'blog';
  const targetPath = isBlogType ? `/blogs/${target.slug}` : `/simulations/${target.slug}`;
  const ctaText = isBlogType ? 'Next post' : 'Ready to try it yourself?';
  const Icon = isBlogType ? ArrowRight : Play;

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={targetPath}
          className="block group"
        >
          <div className={`
            relative overflow-hidden rounded-2xl p-6 sm:p-8
            transition-all duration-300 ease-out
            ${isBlogType
              ? 'bg-gradient-to-r from-ocean-400 via-ocean-500 to-mint-500'
              : 'bg-gradient-to-r from-mint-400 via-mint-500 to-ocean-500'
            }
            hover:shadow-xl hover:scale-[1.02]
            transform
          `}>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-white/90 text-sm font-medium mb-2">
                  {ctaText}
                </p>
                <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight">
                  {target.title}
                </h3>
                <p className="text-white/80 text-sm mt-2 line-clamp-2">
                  {target.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  bg-white/20 backdrop-blur-sm
                  group-hover:bg-white/30 group-hover:scale-110
                  transition-all duration-300
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogFooterCTA;
