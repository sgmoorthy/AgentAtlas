// Auto-update scheduler for daily data refresh
export class UpdateScheduler {
  private static instance: UpdateScheduler;
  private updateInterval: NodeJS.Timeout | null = null;
  private callbacks: (() => Promise<void>)[] = [];

  static getInstance(): UpdateScheduler {
    if (!UpdateScheduler.instance) {
      UpdateScheduler.instance = new UpdateScheduler();
    }
    return UpdateScheduler.instance;
  }

  addUpdateCallback(callback: () => Promise<void>) {
    this.callbacks.push(callback);
  }

  removeUpdateCallback(callback: () => Promise<void>) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  start() {
    if (this.updateInterval) return;

    // Calculate time until next midnight UTC
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set initial timeout for first update
    setTimeout(() => {
      this.executeUpdate();
      
      // Then set daily interval
      this.updateInterval = setInterval(() => {
        this.executeUpdate();
      }, 24 * 60 * 60 * 1000); // 24 hours
    }, timeUntilMidnight);
  }

  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private async executeUpdate() {
    console.log('Executing scheduled update at', new Date().toISOString());
    
    for (const callback of this.callbacks) {
      try {
        await callback();
      } catch (error) {
        console.error('Update callback failed:', error);
      }
    }
  }

  // Manual trigger for testing
  async triggerUpdate() {
    await this.executeUpdate();
  }
}

// Initialize scheduler when module loads
if (typeof window !== 'undefined') {
  const scheduler = UpdateScheduler.getInstance();
  scheduler.start();
}