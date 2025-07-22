import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const AutoUpdateBanner: React.FC = () => {
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null);
  const [timeUntilUpdate, setTimeUntilUpdate] = useState<string>('');

  useEffect(() => {
    // Calculate next update time (daily at midnight UTC)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);
    setNextUpdate(tomorrow);

    const updateTimer = () => {
      if (!nextUpdate) return;
      
      const now = new Date();
      const diff = nextUpdate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeUntilUpdate('Updating now...');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilUpdate(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextUpdate]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-600 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-slate-900 dark:text-white">
              Auto-Update Active
            </span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Next update in {timeUntilUpdate}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        This directory automatically updates daily at midnight UTC, fetching the latest AI agent projects from GitHub.
      </div>
    </div>
  );
};