import BaseService from "./baseService";

export interface MarketInfo {
  symbol: string;
  price: number;
  change: number;
  percent: number;
  currency?: string;
}

class MarketService extends BaseService {
  private static instance: MarketService;

  static getInstance() {
    if (!MarketService.instance) {
      MarketService.instance = new MarketService();
    }
    return MarketService.instance;
  }

  // ───────────────────────────────────────────────
  // 1) QUOTES (cena, zmiana, procent)
  // ───────────────────────────────────────────────
  async loadMarkets(symbols?: string | string[]): Promise<MarketInfo[]> {
    try {
      console.log("Loading market data for symbols:", symbols);
      const res = await this.get("/api/market/get-quotes", {
          symbols: symbols ? Array.isArray(symbols)
            ? symbols.join(",")
            : symbols
            : undefined,
      });

      const results = res?.positions || [];

      return results.map((item: any) => ({
        symbol: item.symbol,
        price: item.regularMarketPrice,
        change: item.regularMarketChange,
        percent: item.regularMarketChangePercent,
        currency: item.currency,
      }));

    } catch (err) {
      console.error("Failed to load market data:", err);
      return [];
    }
  }

  // ───────────────────────────────────────────────
  // 2) CHART
  // ───────────────────────────────────────────────
  async loadChart(symbol: string): Promise<any[]> {
    try {
      const res = await this.get("/api/get-chart", {
        params: { symbol },
      });

      return res?.chart || [];
    } catch (err) {
      console.error("Failed to load chart:", err);
      return [];
    }
  }

  // ───────────────────────────────────────────────
  // 3) COMPANY SUMMARY
  // ───────────────────────────────────────────────
  async loadSummary(symbol: string): Promise<any> {
    try {
      const res = await this.get("/api/get-summary", {
        symbol
      });

      return res || null;
    } catch (err) {
      console.error("Failed to load summary:", err);
      return null;
    }
  }

  // ───────────────────────────────────────────────
  // 4) ASSET PROFILE
  // ───────────────────────────────────────────────
  async loadAssetProfile(symbol: string): Promise<any> {
    try {
      const res = await this.get("/api/get-asset-profile", {
        params: { symbol },
      });

      return res || null;
    } catch (err) {
      console.error("Failed to load asset profile:", err);
      return null;
    }
  }
  
}

export default MarketService;