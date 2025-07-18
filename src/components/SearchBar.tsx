import React, { useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading?: boolean;
}

export interface SearchFilters {
  language: string;
  minStars: number;
  sortBy: 'stars' | 'updated' | 'created';
  topics: string[];
}

const POPULAR_LANGUAGES = ['All', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'Java'];
const POPULAR_TOPICS = ['chatbot', 'llm', 'openai', 'langchain', 'autonomous', 'nlp', 'machine-learning'];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    language: 'All',
    minStars: 0,
    sortBy: 'stars',
    topics: []
  });

  const handleSearch = useCallback(() => {
    onSearch(query, filters);
  }, [query, filters, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleTopic = (topic: string) => {
    setFilters(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const clearFilters = () => {
    setFilters({
      language: 'All',
      minStars: 0,
      sortBy: 'stars',
      topics: []
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-stone-200 dark:border-slate-700 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search AI agents, frameworks, chatbots..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-3 bg-stone-50 dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-stone-100 dark:bg-slate-700 hover:bg-stone-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-colors flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-stone-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-2 bg-stone-50 dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
              >
                {POPULAR_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Min Stars
              </label>
              <input
                type="number"
                value={filters.minStars}
                onChange={(e) => setFilters(prev => ({ ...prev, minStars: parseInt(e.target.value) || 0 }))}
                className="w-full p-2 bg-stone-50 dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full p-2 bg-stone-50 dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="stars">Stars</option>
                <option value="updated">Last Updated</option>
                <option value="created">Recently Created</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full p-2 bg-stone-100 dark:bg-slate-700 hover:bg-stone-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.topics.includes(topic)
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};