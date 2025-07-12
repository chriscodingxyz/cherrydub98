// Centralized NFT data service with CORS proxy handling
// Caching is handled by TanStack Query

class NftService {
  constructor() {
    this.apiKey = import.meta.env.VITE_NFT_KEY;
    this.baseUrl = 'https://api.nftpricefloor.com/api';
    this.corsProxy = 'https://corsproxy.io/?';
  }

  // CORS proxy fetch wrapper
  async fetchWithProxy(url, options = {}) {
    const proxyUrl = `${this.corsProxy}${encodeURIComponent(url)}`;
    
    try {
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('NFT API fetch failed:', error);
      throw error;
    }
  }

  // Get image URL for NFT collection
  getImageUrl(slug) {
    return `https://s3.amazonaws.com/cdn.nftpricefloor/projects/v1/${slug}.png?version=6`;
  }

  // Get OpenSea-style URL for collection
  getCollectionUrl(slug) {
    return `https://nft.chriscoding.xyz/collections/${slug}`.toLowerCase();
  }

  // Filter and transform NFT data
  transformNftData(rawData) {
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid NFT data format');
    }

    // Filter for supported currencies only
    const supportedCurrencies = ['btc', 'eth', 'sol'];
    const filteredData = rawData.filter(item => 
      supportedCurrencies.includes(item.nativeCurrency?.toLowerCase())
    );

    console.log(`🔍 Filtered from ${rawData.length} to ${filteredData.length} NFTs (BTC/ETH/SOL only)`);

    // Transform to consistent format
    const transformedData = filteredData.map((item) => ({
      name: item.name,
      ranking: item.ranking,
      totalSupply: item.stats.totalSupply,
      floorNative: item.stats.floorInfo.currentFloorNative,
      floorUsd: item.stats.floorInfo.currentFloorUsd,
      nativeCurrency: item.nativeCurrency,
      blockchain: item.blockchain,
      count: item.stats.count,
      image: this.getImageUrl(item.slug),
      slug: item.slug,
      collectionUrl: this.getCollectionUrl(item.slug),
    }));

    // Sort by ranking and limit to top 100
    const sortedData = transformedData.sort((a, b) => a.ranking - b.ranking);
    return sortedData.slice(0, 100);
  }

  // Fetch NFT collections with filtering and transformation
  async getNftCollections() {
    if (!this.apiKey) {
      throw new Error('NFT API key not found in environment variables');
    }

    console.log('🚀 Fetching NFT collections with TanStack Query');

    const url = `${this.baseUrl}/projects?qapikey=${this.apiKey}`;
    
    try {
      const rawData = await this.fetchWithProxy(url);
      const transformedData = this.transformNftData(rawData);
      
      console.log('✅ Successfully fetched and transformed NFT data:', transformedData.slice(0, 3));
      return transformedData;
    } catch (error) {
      console.error('❌ Failed to fetch NFT collections:', error);
      throw new Error(`Unable to fetch NFT collections: ${error.message}`);
    }
  }

  // Get decimal precision for currency formatting
  getDecimalPrecision(currency) {
    switch (currency?.toLowerCase()) {
      case 'eth':
      case 'ethereum':
        return 1;
      case 'btc':
      case 'bitcoin':
      case 'sol':
      case 'solana':
        return 2;
      default:
        return 4;
    }
  }
}

// Export singleton instance
export const nftService = new NftService();

// Export individual functions for convenience
export const fetchNftCollections = () => nftService.getNftCollections();
export const getDecimalPrecision = (currency) => nftService.getDecimalPrecision(currency);