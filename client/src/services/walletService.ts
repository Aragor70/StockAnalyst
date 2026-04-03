import BaseService from "./baseService";

export interface WalletPosition {
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
  shares: number;
  currency: string;
}

export interface WalletSummary {
  total: number;
  invested: number;
  profit: number;
}

class WalletService extends BaseService {
  private static instance: WalletService;

  static getInstance() {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  async loadWallet(): Promise<WalletPosition[]> {
    try {
      
      const res = await this.get("/api/wallet/get-positions");

      const results = res?.positions || [];

      return results.map((item: any) => ({
        symbol: item.symbol,
        amount: item.amount,
        currency: item.currency,
        buyPrice: item.buyPrice,
        currentPrice: item.currentPrice,
        shares: item.amount / item.buyPrice
      }));
    } catch (err) {
      console.error("Failed to load wallet:", err);
      return [];
    }
  }

  async loadSummary(): Promise<WalletSummary | null> {
    try {
      const res = await this.get("/api/wallet/get-summary");

      if (!res) return null;

      return {
        total: res.total,
        invested: res.invested,
        profit: res.profit,
      };
    } catch (err) {
      console.error("Failed to load wallet summary:", err);
      return null;
    }
  }

  async addPosition(position: WalletPosition): Promise<boolean> {
    try {
      await this.post("/api/wallet/add-position", position);
      return true;
    } catch (err) {
      console.error("Failed to add position:", err);
      return false;
    }
  }

  async removePosition(symbol: string): Promise<boolean> {
    try {
      await this.delete("/api/wallet/remove-position", {
        params: { symbol },
      });
      return true;
    } catch (err) {
      console.error("Failed to remove position:", err);
      return false;
    }
  }

  /**
   * Aktualizuje cenę pozycji
   */
  async updatePosition(symbol: string, currentPrice: number): Promise<boolean> {
    try {
      await this.put("/api/wallet/update-position", {
        symbol,
        currentPrice,
      });
      return true;
    } catch (err) {
      console.error("Failed to update position:", err);
      return false;
    }
  }
}

export default WalletService;