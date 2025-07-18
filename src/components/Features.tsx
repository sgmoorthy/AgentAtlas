import React from 'react';
import { Search, Users, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description: "Find exactly what you're looking for with our intelligent search and filtering system."
  },
  {
    icon: Users,
    title: "Quality Profiles",
    description: "Every profile is verified and curated to ensure you connect with the right people."
  },
  {
    icon: Zap,
    title: "Instant Connect",
    description: "Reach out to companies and talent instantly with our streamlined communication tools."
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access a worldwide network of innovative companies and exceptional professionals."
  }
];

export const Features: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose Us
            <span className="text-5xl sm:text-6xl ml-4">💫</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We make it easy to discover, connect, and collaborate with the best talent and companies worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-stone-100 dark:bg-slate-700/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};