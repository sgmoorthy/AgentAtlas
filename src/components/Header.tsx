import React from 'react';
import { Search, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="bg-stone-50/80 dark:bg-slate-900/50 backdrop-blur-sm border-b border-stone-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" className="text-blue-600">
                <g fill="none" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M40 22c0-9.941-8.059-18-18-18S4 12.059 4 22s8.059 18 18 18"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M33.3 30c-1.822 0-3.3 1.722-3.3 3.846c0 3.845 3.9 7.34 6 8.154c2.1-.813 6-4.31 6-8.154C42 31.722 40.523 30 38.7 30c-1.116 0-2.103.646-2.7 1.634c-.597-.988-1.584-1.634-2.7-1.634"/>
                  <path d="M22 27a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"/>
                </g>
              </svg>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Directory</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">AI Agents</a>
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Trending</a>
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Categories</a>
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Submit Project
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};