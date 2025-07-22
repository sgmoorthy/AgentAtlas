import React from 'react';
import { Star, GitFork, ExternalLink, Calendar, User, Code } from 'lucide-react';
import { AIAgent } from '../types';

interface AIAgentCardProps {
  agent: AIAgent;
}

export const AIAgentCard: React.FC<AIAgentCardProps> = ({ agent }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="group bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-stone-200 dark:border-slate-700 rounded-2xl p-6 hover:bg-white dark:hover:bg-slate-800/70 hover:border-stone-300 dark:hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-stone-900/10 dark:hover:shadow-slate-900/50">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={agent.owner.avatar}
          alt={agent.owner.name}
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 truncate">
            {agent.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed mb-2">
            {agent.description}
          </p>
          <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
            <User className="w-3 h-3" />
            <span>{agent.owner.name}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{formatNumber(agent.stars)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <GitFork className="w-4 h-4" />
          <span>{formatNumber(agent.forks)}</span>
        </div>
        {agent.language && (
          <div className="flex items-center space-x-1">
            <Code className="w-4 h-4" />
            <span>{agent.language}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
        <Calendar className="w-3 h-3" />
        <span>Updated {formatDate(agent.lastUpdated)}</span>
        {agent.license && (
          <>
            <span>•</span>
            <span>{agent.license}</span>
          </>
        )}
      </div>

      {agent.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.topics.slice(0, 4).map((topic, index) => (
            <span
              key={index}
              className="bg-stone-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded-full border border-stone-200 dark:border-slate-600/50"
            >
              {topic}
            </span>
          ))}
          {agent.topics.length > 4 && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              +{agent.topics.length - 4} more
            </span>
          )}
        </div>
      )}

      <div className="flex space-x-2">
        <a
          href={agent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-stone-100 dark:bg-slate-700/50 hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center space-x-2"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};