import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { AIAgentsGrid } from './components/AIAgentsGrid';
import { AutoUpdateBanner } from './components/AutoUpdateBanner';
import { Footer } from './components/Footer';

function App() {
  // Initialize theme system
  useTheme();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AutoUpdateBanner />
        </div>
        <AIAgentsGrid />
      </div>
      <Footer />
    </div>
  );
}

export default App;