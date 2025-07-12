import { useQuery } from '@tanstack/react-query'
import { nftService } from '../services/nftService'
import { queryKeys } from '../lib/queryKeys'

// Hook for fetching NFT collections with optimal caching for slower-changing data
export const useNftCollections = (currencies = ['btc', 'eth', 'sol']) => {
  return useQuery({
    queryKey: queryKeys.nft.collections(currencies),
    queryFn: () => nftService.getNftCollections(),
    
    // NFT data changes less frequently than crypto prices
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
    
    // Keep cached longer since NFT data is more stable
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in background cache
    
    // Background refetch on window focus for fresh data
    refetchOnWindowFocus: true,
    
    // Refetch on network reconnect
    refetchOnReconnect: true,
    
    // Don't refetch on mount if we have fresh data
    refetchOnMount: false,
    
    // Retry failed requests with exponential backoff
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Keep previous data while refetching to prevent loading states
    keepPreviousData: true,
    
    // Enable background refetch every 10 minutes for fresh data
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    
    // Only refetch in background if window is visible
    refetchIntervalInBackground: false,
    
    // Error handling
    onError: (error) => {
      console.error('NFT collections query failed:', error);
    },
    
    // Success logging
    onSuccess: (data) => {
      console.log(`✅ NFT collections cached: ${data?.length} collections`);
    }
  })
}

// Utility hook to get NFT collections with specific currencies
export const useFilteredNftCollections = (currencies) => {
  return useNftCollections(currencies);
}

// Hook to get just the supported currency NFTs (default behavior)
export const useSupportedNftCollections = () => {
  return useNftCollections(['btc', 'eth', 'sol']);
}