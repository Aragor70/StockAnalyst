import BaseService from './baseService';

export interface MarketInfo {
  symbol: string;
  price: number;
  change: number;
  percent: number;
}

class MarketService extends BaseService {
  private static instance: MarketService;

  static getInstance() {
    if (!MarketService.instance) {
      MarketService.instance = new MarketService();
    }
    return MarketService.instance;
  }

  async loadMarkets(symbols: string[]): Promise<MarketInfo[]> {
    try {

      const res = await this.get('/api/market/get-quotes', {
        params: {
          symbols: symbols.join(',')
        }
      });

      const results = res?.quotes || [];

      return results.map((item: any) => ({
        symbol: item.symbol,
        price: item.regularMarketPrice,
        change: item.regularMarketChange,
        percent: item.regularMarketChangePercent
      }));
      
    } catch (err) {
      console.error('Failed to load market data:', err);
      return [];
    }
  }
}
export default MarketService;