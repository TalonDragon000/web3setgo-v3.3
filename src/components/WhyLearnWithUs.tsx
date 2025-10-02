import React from 'react';
import { Shield, BookOpen, CheckCircle } from 'lucide-react';

const WhyLearnWithUs: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safe Practice',
      description: 'Try crypto with test wallets using fake money. Learn without any financial risk.',
      color: 'text-green-500',
    },
    {
      icon: BookOpen,
      title: 'Step-by-Step Guides',
      description: 'Hand-holding tutorials designed for complete beginners. No prior knowledge needed.',
      color: 'text-ocean-500',
    },
    {
      icon: CheckCircle,
      title: 'Vetted Resources',
      description: 'Only safe, beginner-friendly apps and platforms. No scams, no complicated interfaces.',
      color: 'text-success-500',
    },
  ];

  return (
    <section id="why-learn" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Web3 is confusing. We make it simple.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn at your own pace with tools designed to keep you safe while exploring the future of the internet.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-gradient-to-br from-slate-50 to-mint-50/50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className={`inline-flex p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearnWithUs;