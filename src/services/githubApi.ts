import { GitHubRepo, AIAgent } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

// Search queries for AI agent related repositories
const AI_AGENT_QUERIES = [
  'ai agent',
  'ai assistant',
  'autonomous agent',
  'llm agent',
  'chatbot framework',
  'conversational ai',
  'ai workflow',
  'agent framework',
  'multi-agent system',
  'intelligent agent'
];

export class GitHubService {
  private static instance: GitHubService;
  private cache: Map<string, { data: AIAgent[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  private async fetchWithRetry(url: string, retries = 3): Promise<Response> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AI-Agents-Directory'
    };

    // Add authentication if token is available
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, { headers });
        if (response.ok) return response;
        if (response.status === 403) {
          // Rate limited or forbidden, wait longer and retry
          const waitTime = token ? 2000 * (i + 1) : 5000 * (i + 1);
          console.warn(`Rate limited, waiting ${waitTime}ms before retry ${i + 1}/${retries}`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        if (response.status === 422) {
          // Unprocessable entity - likely search query issue
          console.warn('Search query issue:', url);
          throw new Error(`Search query error: ${response.statusText}`);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        if (i === retries - 1) throw error;
        const waitTime = 2000 * (i + 1);
        console.warn(`Request failed, retrying in ${waitTime}ms:`, error);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    throw new Error('Max retries exceeded');
  }

  private transformRepo(repo: GitHubRepo): AIAgent {
    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Unknown',
      topics: repo.topics || [],
      lastUpdated: repo.updated_at,
      created: repo.created_at,
      owner: {
        name: repo.owner.login,
        avatar: repo.owner.avatar_url,
        url: repo.owner.html_url
      },
      license: repo.license?.name
    };
  }

  async searchAIAgents(query?: string): Promise<AIAgent[]> {
    const cacheKey = query || 'all';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const allRepos: AIAgent[] = [];
      const seenRepos = new Set<number>();

      const searchQueries = query ? [query] : AI_AGENT_QUERIES;
      const maxQueries = query ? 1 : 5; // Limit queries to avoid rate limits

      for (let i = 0; i < Math.min(searchQueries.length, maxQueries); i++) {
        const searchQuery = searchQueries[i];
        const searchUrl = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(
          `${searchQuery} language:python OR language:javascript OR language:typescript stars:>10`
        )}&sort=stars&order=desc&per_page=50`;

        const response = await this.fetchWithRetry(searchUrl);
        const data = await response.json();

        if (data.items) {
          const repos = data.items
            .filter((repo: GitHubRepo) => !seenRepos.has(repo.id))
            .map((repo: GitHubRepo) => {
              seenRepos.add(repo.id);
              return this.transformRepo(repo);
            });

          allRepos.push(...repos);
        }

        // Add delay to respect rate limits (longer for unauthenticated requests)
        const delay = import.meta.env.VITE_GITHUB_TOKEN ? 200 : 1000;
        if (i < Math.min(searchQueries.length, maxQueries) - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      // Sort by stars and remove duplicates
      const uniqueRepos = allRepos
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 100); // Limit to top 100 results to reduce load

      this.cache.set(cacheKey, { data: uniqueRepos, timestamp: Date.now() });
      return uniqueRepos;
    } catch (error) {
      console.error('Error fetching AI agents:', error);
      
      // Provide helpful error message based on error type
      if (error instanceof Error && error.message.includes('Max retries exceeded')) {
        console.warn('GitHub API rate limit exceeded. Consider adding a VITE_GITHUB_TOKEN to .env.local for higher rate limits.');
      }
      
      // Return cached data if available, otherwise empty array
      return cached?.data || [];
    }
  }

  async getTrendingAIAgents(): Promise<AIAgent[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const dateString = oneWeekAgo.toISOString().split('T')[0];

    const searchUrl = `${GITHUB_API_BASE}/search/repositories?q=ai+agent+created:>${dateString}&sort=stars&order=desc&per_page=20`;

    try {
      const response = await this.fetchWithRetry(searchUrl);
      const data = await response.json();

      return data.items ? data.items.map((repo: GitHubRepo) => this.transformRepo(repo)) : [];
    } catch (error) {
      console.error('Error fetching trending AI agents:', error);
      return [];
    }
  }
}