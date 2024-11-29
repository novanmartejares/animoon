// lib/cache.js
import NodeCache from 'node-cache';

// Initialize a new cache instance
const cache = new NodeCache({
  stdTTL: 0, // Default to no expiration (permanent caching)
  checkperiod: 600, // Interval to check for expired entries
});

export default cache;

