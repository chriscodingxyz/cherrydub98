// Query keys factory for consistent query key management
// This ensures proper cache invalidation and prevents key conflicts

export const queryKeys = {
  // Crypto-related query keys
  crypto: {
    // Base key for all crypto queries
    all: ['crypto'],

    // Market data queries
    marketData: (currency, perPage, page) => [
      ...queryKeys.crypto.all,
      'marketData',
      { currency, perPage, page }
    ],

    // Simple price queries
    simplePrices: coins => [
      ...queryKeys.crypto.all,
      'simplePrices',
      { coins: coins.sort() } // Sort to ensure consistent keys
    ],

    // Individual coin price queries
    bitcoinPrice: () => [...queryKeys.crypto.all, 'bitcoinPrice'],
    ethereumPrice: () => [...queryKeys.crypto.all, 'ethereumPrice'],
    solanaPrice: () => [...queryKeys.crypto.all, 'solanaPrice']
  },

  // NFT-related query keys
  nft: {
    all: ['nft'],
    // NFT collections with filtering for supported currencies
    collections: (currencies = ['btc', 'eth', 'sol']) => [
      ...queryKeys.nft.all,
      'collections',
      { currencies: currencies.sort() } // Sort for consistent keys
    ],
    topCollections: limit => [
      ...queryKeys.nft.all,
      'topCollections',
      { limit }
    ],
    collection: slug => [...queryKeys.nft.all, 'collection', slug]
  },

  // Utility functions for query management
  utils: {
    // Get all crypto queries for invalidation
    getAllCryptoQueries: () => queryKeys.crypto.all,

    // Get market data queries for specific currency
    getMarketDataForCurrency: currency => queryKeys.crypto.marketData(currency)
  }
}
