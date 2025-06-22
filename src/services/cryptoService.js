// Centralized crypto data service with fallback APIs
// Caching is now handled by TanStack Query
import axios from 'axios';

class CryptoService {
  constructor() {
    // TanStack Query handles caching - no need for manual cache
  }

  // Primary: CoinGecko API (free tier)
  async fetchFromCoinGecko(endpoint) {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3${endpoint}`, {
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      console.warn('CoinGecko API failed:', error.message);
      throw error;
    }
  }

  // Fallback: CoinDesk for Bitcoin
  async fetchBitcoinFromCoinDesk() {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', {
        timeout: 10000
      });
      return {
        bitcoin: {
          usd: parseFloat(response.data.bpi.USD.rate_float)
        }
      };
    } catch (error) {
      console.warn('CoinDesk API failed:', error.message);
      throw error;
    }
  }

  // Fallback: CryptoCompare API
  async fetchFromCryptoCompare(symbols) {
    try {
      const symbolsStr = symbols.join(',');
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolsStr}&tsyms=USD`,
        { timeout: 10000 }
      );
      
      // Convert to CoinGecko-like format
      const data = {};
      Object.keys(response.data).forEach(symbol => {
        const coinId = symbol.toLowerCase() === 'btc' ? 'bitcoin' : 
                      symbol.toLowerCase() === 'eth' ? 'ethereum' : symbol.toLowerCase();
        data[coinId] = { usd: response.data[symbol].USD };
      });
      
      return data;
    } catch (error) {
      console.warn('CryptoCompare API failed:', error.message);
      throw error;
    }
  }

  // Get simple prices (Bitcoin, Ethereum, etc.)
  async getSimplePrices(coins = ['bitcoin', 'ethereum']) {
    const coinsStr = coins.join(',');
    
    try {
      // Try CoinGecko first
      const data = await this.fetchFromCoinGecko(`/simple/price?ids=${coinsStr}&vs_currencies=usd`);
      return data;
    } catch (error) {
      try {
        // Fallback to CryptoCompare
        const symbols = coins.map(coin => 
          coin === 'bitcoin' ? 'BTC' : 
          coin === 'ethereum' ? 'ETH' : coin.toUpperCase()
        );
        const data = await this.fetchFromCryptoCompare(symbols);
        return data;
      } catch (fallbackError) {
        try {
          // Last resort: CoinDesk for Bitcoin only
          if (coins.includes('bitcoin')) {
            const btcData = await this.fetchBitcoinFromCoinDesk();
            return btcData;
          }
        } catch (lastError) {
          console.error('All crypto APIs failed:', lastError);
          throw new Error('Unable to fetch crypto prices from any source');
        }
      }
    }
  }

  // Get market data for crypto list
  async getMarketData(currency = 'usd', perPage = 25, page = 1) {
    try {
      const data = await this.fetchFromCoinGecko(
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&locale=en`
      );
      return data;
    } catch (error) {
      // For market data, we don't have good fallbacks, so throw error
      console.warn('Failed to fetch market data:', error);
      throw new Error('Unable to fetch crypto market data');
    }
  }

  // Individual price fetchers for backward compatibility
  async getBitcoinPrice() {
    try {
      const data = await this.getSimplePrices(['bitcoin']);
      return Math.round(data.bitcoin?.usd || 0);
    } catch (error) {
      console.warn('Failed to get Bitcoin price:', error);
      return '--';
    }
  }

  async getEthereumPrice() {
    try {
      const data = await this.getSimplePrices(['ethereum']);
      return Math.round(data.ethereum?.usd || 0);
    } catch (error) {
      console.warn('Failed to get Ethereum price:', error);
      return '--';
    }
  }
}

// Export singleton instance
export const cryptoService = new CryptoService();

// Export individual functions for backward compatibility
export const fetchBitcoinPrice = () => cryptoService.getBitcoinPrice();
export const fetchEthereumPrice = () => cryptoService.getEthereumPrice();