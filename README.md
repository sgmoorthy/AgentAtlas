# AI Agents Directory

A comprehensive directory of open-source AI agents, frameworks, and tools from GitHub. This application automatically discovers and catalogs AI-related projects, providing a searchable interface with detailed information about each project.

## Features

### 🤖 Comprehensive AI Agent Discovery
- Automatically searches GitHub for AI agent projects using multiple search queries
- Covers various categories: chatbots, LLM agents, autonomous agents, AI assistants, and more
- Filters for quality projects with minimum star requirements

### 🔍 Advanced Search & Filtering
- Real-time search across project names, descriptions, and topics
- Filter by programming language, minimum stars, and topics
- Sort by stars, last updated, or creation date
- Topic-based filtering for specific AI domains

### 📊 Rich Project Information
- GitHub stars, forks, and language information
- Project descriptions and topics/tags
- Owner information with avatars
- License information
- Last updated timestamps

### 🔄 Automatic Daily Updates
- Scheduled daily updates at midnight UTC
- Auto-refresh banner showing next update time
- Manual refresh capability
- Trending projects section for recently created repositories

### 🎨 Modern UI/UX
- Dark/light theme support with system preference detection
- Responsive design for all device sizes
- Smooth animations and hover effects
- Loading states and error handling

## Technical Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for styling with custom design system
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

### Data Layer
- **GitHub REST API** integration for real-time data
- Smart caching system to respect rate limits
- Multiple search strategies for comprehensive coverage
- Error handling and retry mechanisms

### Search Strategy
The application uses multiple search queries to discover AI agent projects:
- "ai agent"
- "ai assistant" 
- "autonomous agent"
- "llm agent"
- "chatbot framework"
- "conversational ai"
- "ai workflow"
- "agent framework"
- "multi-agent system"
- "intelligent agent"

### Auto-Update System
- Calculates next update time (daily at midnight UTC)
- Visual countdown timer showing time until next update
- Background refresh without user intervention
- Manual refresh capability for immediate updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ai-agents-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

## Usage

### Basic Search
1. Use the search bar to find specific AI agents or frameworks
2. Results are filtered in real-time as you type
3. Click on any project card to view it on GitHub

### Advanced Filtering
1. Click the "Filters" button to access advanced options
2. Filter by programming language, minimum stars, or topics
3. Sort results by popularity, recency, or creation date
4. Use topic tags for domain-specific searches

### Trending Projects
1. Switch to the "Trending" tab to see recently created projects
2. Discover new and emerging AI agent projects
3. Perfect for staying up-to-date with the latest developments

## API Integration

The application integrates with the GitHub REST API:

```typescript
// Example API call
const searchUrl = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=50`;
```

### Rate Limiting
- Implements intelligent caching to minimize API calls
- Respects GitHub's rate limits with retry mechanisms
- Caches results for 1 hour to improve performance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GitHub API for providing access to repository data
- The open-source AI community for creating amazing projects
- All contributors and maintainers of the featured AI agent projects