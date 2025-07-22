import React, { useState, useEffect, useCallback } from 'react';
import { AIAgentCard } from './AIAgentCard';
import { SearchBar, SearchFilters } from './SearchBar';
import { GitHubService } from '../services/githubApi';
import { AIAgent } from '../types';
import { RefreshCw, TrendingUp, Clock } from 'lucide-react';

export const AIAgentsGrid: React.FC = () => {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<AIAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'trending'>('all');

  const githubService = GitHubService.getInstance();

  const loadAgents = useCallback(async (query?: string) => {
    setIsLoading(true);
    try {
      const data = await githubService.searchAIAgents(query);
      setAgents(data);
      setFilteredAgents(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load AI agents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [githubService]);

  const loadTrendingAgents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await githubService.getTrendingAIAgents();
      setAgents(data);
      setFilteredAgents(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load trending AI agents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [githubService]);

  const handleSearch = useCallback((query: string, filters: SearchFilters) => {
    let filtered = [...agents];

    // Apply text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm) ||
        agent.description.toLowerCase().includes(searchTerm) ||
        agent.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
        agent.owner.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply language filter
    if (filters.language !== 'All') {
      filtered = filtered.filter(agent => agent.language === filters.language);
    }

    // Apply minimum stars filter
    if (filters.minStars > 0) {
      filtered = filtered.filter(agent => agent.stars >= filters.minStars);
    }

    // Apply topics filter
    if (filters.topics.length > 0) {
      filtered = filtered.filter(agent =>
        filters.topics.some(topic => agent.topics.includes(topic))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'stars':
          return b.stars - a.stars;
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'created':
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        default:
          return 0;
      }
    });

    setFilteredAgents(filtered);
  }, [agents]);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  const handleTabChange = (tab: 'all' | 'trending') => {
    setActiveTab(tab);
    if (tab === 'trending') {
      loadTrendingAgents();
    } else {
      loadAgents();
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-slate-900 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            AI Agents Directory
            <span className="text-5xl sm:text-6xl ml-4">🤖</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Discover the latest open-source AI agents, frameworks, and tools from GitHub. 
            Updated daily with the most innovative projects in artificial intelligence.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex bg-white dark:bg-slate-800 rounded-full p-1 border border-stone-200 dark:border-slate-700">
              <button
                onClick={() => handleTabChange('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => handleTabChange('trending')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 ${
                  activeTab === 'trending'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Trending</span>
              </button>
            </div>
            
            <button
              onClick={() => activeTab === 'all' ? loadAgents() : loadTrendingAgents()}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {lastUpdated && (
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated.toLocaleString()}</span>
            </div>
          )}
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-2xl p-6 animate-pulse"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-stone-200 dark:bg-slate-700 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-stone-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-stone-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-16"></div>
                  <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-16"></div>
                  <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-20"></div>
                </div>
                <div className="h-10 bg-stone-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredAgents.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Showing {filteredAgents.length} AI agent{filteredAgents.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AIAgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No AI agents found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => loadAgents()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Load All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};