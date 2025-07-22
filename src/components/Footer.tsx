import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-bold text-slate-900 dark:text-white">AI Agents Directory</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
              Discover the latest open-source AI agents, frameworks, and tools from GitHub. 
              Updated daily with the most innovative projects in artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Agents</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Trending</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Featured</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-200 dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400">© 2024 AI Agents Directory. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};