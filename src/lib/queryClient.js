import { QueryClient } from '@tanstack/react-query'

// Create QueryClient with optimized settings for crypto/NFT data
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Crypto data stale time - 30 seconds (frequent updates needed)
      staleTime: 30 * 1000,
      // Cache time - 5 minutes (keep in background cache)
      gcTime: 5 * 60 * 1000,
      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Background refetch on window focus
      refetchOnWindowFocus: true,
      // Background refetch on network reconnect
      refetchOnReconnect: true,
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
})