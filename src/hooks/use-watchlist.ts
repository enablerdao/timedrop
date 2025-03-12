import { useState, useEffect } from 'react';
import { Property } from '@/data/properties';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('timedrop-watchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage', error);
        localStorage.removeItem('timedrop-watchlist');
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('timedrop-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (propertyId: string) => {
    setWatchlist(prev => {
      if (prev.includes(propertyId)) return prev;
      return [...prev, propertyId];
    });
  };

  const removeFromWatchlist = (propertyId: string) => {
    setWatchlist(prev => prev.filter(id => id !== propertyId));
  };

  const toggleWatchlist = (propertyId: string) => {
    if (isInWatchlist(propertyId)) {
      removeFromWatchlist(propertyId);
      return false;
    } else {
      addToWatchlist(propertyId);
      return true;
    }
  };

  const isInWatchlist = (propertyId: string) => {
    return watchlist.includes(propertyId);
  };

  const getWatchlistProperties = (allProperties: Property[]) => {
    return allProperties.filter(property => watchlist.includes(property.id));
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    getWatchlistProperties
  };
};