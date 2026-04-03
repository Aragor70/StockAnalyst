import BaseService from './baseService';
import { MarketInfo } from './marketService';

class SearchService extends BaseService {
  private static instance: SearchService;

  static getInstance() {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

    async searchTickers(formData: any): Promise<MarketInfo[]> {
        try {
            const res = await this.get('/api/market/get-quotes', {
            params: {
                symbols: formData.symbol
            }
            });

            const results = Array.isArray(res?.quotes) ? res.quotes : [];

            return results.map((item: any) => ({
              symbol: item.symbol,
              price: item.regularMarketPrice,
              change: item.regularMarketChange,
              percent: item.regularMarketChangePercent,
              currency: item.currency
            }));
            
        } catch (err) {
            console.error('Failed to load market data:', err);
            return [];
        }
    }
}
export default SearchService;