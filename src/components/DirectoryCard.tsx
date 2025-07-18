import React from 'react';
import { ExternalLink, MapPin, Users } from 'lucide-react';

interface DirectoryCardProps {
  name: string;
  description: string;
  logo: string;
  tags: string[];
  location?: string;
  employees?: string;
  type: 'company' | 'talent';
}

export const DirectoryCard: React.FC<DirectoryCardProps> = ({
  name,
  description,
  logo,
  tags,
  location,
  employees,
  type
}) => {
  return (
    <div className="group bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-stone-200 dark:border-slate-700 rounded-2xl p-6 hover:bg-white dark:hover:bg-slate-800/70 hover:border-stone-300 dark:hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-stone-900/10 dark:hover:shadow-slate-900/50">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 truncate">{name}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-stone-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-xs px-3 py-1 rounded-full border border-stone-200 dark:border-slate-600/50">
            {tag}
          </span>
        ))}
      </div>
      
      {(location || employees) && (
        <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
          {location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
          {employees && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{employees}</span>
            </div>
          )}
        </div>
      )}
      
      <button className="w-full bg-stone-100 dark:bg-slate-700/50 hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center space-x-2">
        <span>View Profile</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};