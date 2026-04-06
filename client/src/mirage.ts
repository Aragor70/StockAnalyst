import { createServer } from "miragejs";

import en from "./assets/lang/en.json";
import { mockedWalletPositions, mockedWalletSummary } from "./assets/mock";

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = "api";

      // ---------------------------------------------
      // LANGUAGE
      // ---------------------------------------------
      this.get("/language", () => {
        return {
          languageCode: "en",
          data: en || {},
        };
      });

      // ---------------------------------------------
      // MARKET QUOTES (loadMarkets)
      // ---------------------------------------------
      this.get("/market/get-quotes", (_schema, request) => {

        console.log("Received symbols:", request.queryParams.symbols);
        const raw = request.queryParams.symbols ?? ["AAPL"];
        const symbols = Array.isArray(raw) ? raw : raw.split(",");

        const positions = symbols.map((symbol) => {
          const price = Number((Math.random() * 200 + 50).toFixed(2));
          const change = Number((Math.random() * 4 - 2).toFixed(2));
          const percent = Number(((change / price) * 100).toFixed(2));
          const currency = "USD";

          return {
            symbol,
            regularMarketPrice: price,
            regularMarketChange: change,
            regularMarketChangePercent: percent,
            currency
          };
        });

        return { positions };
      });

      // ---------------------------------------------
      // CHART DATA (loadChart)
      // ---------------------------------------------
      this.get("/get-chart", (_schema, request) => {
        const symbol = request.queryParams.symbol || "AAPL";

        const points = Array.from({ length: 60 }).map((_, i) => ({
          timestamp: Date.now() - i * 60000,
          price: Number((Math.random() * 200 + 50).toFixed(2)),
        }));

        return { symbol, chart: points.reverse() };
      });

      // ---------------------------------------------
      // MARKET MOVERS (optional)
      // ---------------------------------------------
      this.get("/get-movers", () => {
        const movers = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN"].map((symbol) => ({
          symbol,
          price: Number((Math.random() * 200 + 50).toFixed(2)),
          changePercent: Number((Math.random() * 10 - 5).toFixed(2)),
        }));

        return {
          gainers: movers.slice(0, 2),
          losers: movers.slice(2, 4),
          active: movers,
        };
      });

      // ---------------------------------------------
      // NEWS (optional)
      // ---------------------------------------------
      this.get("/get-news", () => {
        return {
          news: [
            {
              title: "Market Update: Tech Stocks Rally",
              publisher: "Bloomberg",
              link: "https://example.com/news1",
              summary: "Tech stocks saw strong gains today as...",
            },
            {
              title: "Tesla Announces New Battery Tech",
              publisher: "Reuters",
              link: "https://example.com/news2",
              summary: "Tesla revealed a breakthrough in battery...",
            },
          ],
        };
      });

      // ============================================================
      // WALLET
      // ============================================================
      this.get("/wallet/get-positions", () => {
        return { positions: mockedWalletPositions };
      });

      this.get("/wallet/get-summary", () => {
        return mockedWalletSummary;
      });

      this.post("/wallet/add-position", (_schema, request) => {
        const data = JSON.parse(request.requestBody);
        const positions = [...mockedWalletPositions, data];
        return { success: true, data: positions };
      });

      this.delete("/wallet/remove-position", (_schema, request) => {
        const symbol = request.queryParams.symbol;
        const positions = mockedWalletPositions.filter((p) => p.symbol !== symbol);
        return { success: true, data: positions };
      });

      this.put("/wallet/update-position", (_schema, request) => {
        const data = JSON.parse(request.requestBody);

        const positions = mockedWalletPositions.map((p) =>
          p.symbol === data.symbol ? { ...p, currentPrice: data.currentPrice } : p
        );

        return { success: true, data: positions };
      });

      // ---------------------------------------------
      // SEARCH
      // ---------------------------------------------
      this.get("/search", (_schema, request) => {
        const raw = request.queryParams.q || "";
        const q = Array.isArray(raw) ? raw[0].toLowerCase() : raw.toLowerCase();

        const all = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN", "META", "GOOG"];

        const results = all.filter((s) => s.toLowerCase().includes(q));

        return { results };
      });

      this.get("/get-chart", () => {
        const points = Array.from({ length: 50 }).map((_, i) => ({
          timestamp: Date.now() - i * 60000,
          price: Number((100 + Math.random() * 10).toFixed(2)),
        }));

        return { chart: points.reverse() };
      });

      this.get("/get-summary", () => {
        return {
          summary: {
            longName: "Apple Inc.",
            sector: "Technology",
            industry: "Consumer Electronics",
            marketCap: 2500000000000,
            website: "https://apple.com",
          },
          more: {
            address: "One Apple Park Way, Cupertino, CA",
            employees: 164000,
            description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
          }
        };
      });

    },
  });
}