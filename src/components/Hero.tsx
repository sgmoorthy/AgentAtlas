import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Discover Amazing
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Talent & Companies
            </span>
            <span className="text-6xl sm:text-7xl lg:text-8xl ml-4">🚀</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Connect with the world's most innovative companies and exceptional talent. 
            Your next opportunity is just a click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 border border-stone-200 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-600 flex items-center space-x-2">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};