import { useQuery } from '@tanstack/react-query'
import { cryptoService } from '../services/cryptoService'
import { queryKeys } from '../lib/queryKeys'

// Hook for fetching crypto market data (used by CryptoList)
export const useMarketData = (currency = 'usd', perPage = 25, page = 1) => {
  return useQuery({
    queryKey: queryKeys.crypto.marketData(currency, perPage, page),
    queryFn: () => cryptoService.getMarketData(currency, perPage, page),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Auto-refetch every minute
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

// Hook for fetching simple prices (Bitcoin, Ethereum, etc.)
export const useSimplePrices = (coins = ['bitcoin', 'ethereum']) => {
  return useQuery({
    queryKey: queryKeys.crypto.simplePrices(coins),
    queryFn: () => cryptoService.getSimplePrices(coins),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Auto-refetch every minute
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

// Hook for Bitcoin price specifically
export const useBitcoinPrice = () => {
  return useQuery({
    queryKey: queryKeys.crypto.bitcoinPrice(),
    queryFn: () => cryptoService.getBitcoinPrice(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Auto-refetch every minute
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

// Hook for Ethereum price specifically
export const useEthereumPrice = () => {
  return useQuery({
    queryKey: queryKeys.crypto.ethereumPrice(),
    queryFn: () => cryptoService.getEthereumPrice(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Auto-refetch every minute
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

// Hook for Solana price specifically
export const useSolanaPrice = () => {
  return useQuery({
    queryKey: queryKeys.crypto.solanaPrice(),
    queryFn: () => cryptoService.getSolanaPrice(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Auto-refetch every minute
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}
