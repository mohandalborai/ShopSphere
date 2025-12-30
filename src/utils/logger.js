const logger = {
  error: (message, error) => {
    // In production, this should send to a service like Sentry
    // For now, we log to console only in development or if critical
    if (import.meta.env.DEV) {
      console.error(`[Error] ${message}`, error);
    }
  },
  warn: (message, data) => {
    if (import.meta.env.DEV) {
      console.warn(`[Warn] ${message}`, data);
    }
  },
  info: (message, data) => {
    if (import.meta.env.DEV) {
      console.info(`[Info] ${message}`, data);
    }
  },
  // Add a way to log without console.error for tests avoiding noise
  log: (message) => {
    if (import.meta.env.DEV) {
       console.log(message);
    }
  }
};

export default logger;
