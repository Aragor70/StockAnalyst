import { createServer } from "miragejs";

import en from "./assets/lang/en.json";

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = "api";

      this.get("/language", (_schema, _request) => {

        const languageCode = "en";

        const translations = en;

        return { languageCode, data: translations|| {} };
      });

      // -------------------------------------------------------
      // 1. GET QUOTES
      // -------------------------------------------------------
      this.get("/market/get-quotes", (_schema, request) => {

        const raw = request.queryParams.symbols ?? ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN"];
        const symbols = Array.isArray(raw) ? raw : raw.split(",");


        const quotes = symbols.map((symbol: string) => {
          const price = Number((Math.random() * 200 + 50).toFixed(2));
          const change = Number((Math.random() * 4 - 2).toFixed(2));
          const percent = Number(((change / price) * 100).toFixed(2));

          return {
            symbol,
            regularMarketPrice: price,
            regularMarketChange: change,
            regularMarketChangePercent: percent,
          };
        });

        return { quotes };
      });

      // -------------------------------------------------------
      // 2. HISTORICAL DATA
      // -------------------------------------------------------
      this.get("/get-historical-data", (_schema, request) => {
        const symbol = request.queryParams.symbol || "AAPL";

        const days = Array.from({ length: 30 }).map((_, i) => {
          const price = Number((Math.random() * 200 + 50).toFixed(2));
          return {
            date: `2024-01-${(i + 1).toString().padStart(2, "0")}`,
            close: price,
            open: price - Number((Math.random() * 3).toFixed(2)),
            high: price + Number((Math.random() * 2).toFixed(2)),
            low: price - Number((Math.random() * 2).toFixed(2)),
            volume: Math.floor(Math.random() * 5_000_000),
          };
        });

        return {
          symbol,
          historical: days,
        };
      });

      // -------------------------------------------------------
      // 3. MARKET MOVERS (gainers/losers/active)
      // -------------------------------------------------------
      this.get("/get-movers", () => {
        const movers = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN"].map((symbol: string) => ({
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

      // -------------------------------------------------------
      // 4. NEWS
      // -------------------------------------------------------
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

      // -------------------------------------------------------
      // 5. CHART DATA (intraday)
      // -------------------------------------------------------
      this.get("/get-chart", (_schema, request) => {
        const symbol = request.queryParams.symbol || "AAPL";

        const points = Array.from({ length: 60 }).map((_, i) => ({
          timestamp: Date.now() - i * 60000,
          price: Number((Math.random() * 200 + 50).toFixed(2)),
        }));

        return {
          symbol,
          chart: points.reverse(),
        };
      });

      // -------------------------------------------------------
      // 6. SUMMARY (company overview)
      // -------------------------------------------------------
      this.get("/get-summary", (_schema, request) => {
        const symbol = request.queryParams.symbol || "AAPL";

        return {
          symbol,
          longName: "Apple Inc.",
          sector: "Technology",
          industry: "Consumer Electronics",
          marketCap: 2_500_000_000_000,
          website: "https://apple.com",
        };
      });

      // -------------------------------------------------------
      // 7. ASSET PROFILE
      // -------------------------------------------------------
      this.get("/get-asset-profile", (_schema, request) => {
        const symbol = request.queryParams.symbol || "AAPL";

        return {
          symbol,
          address: "1 Apple Park Way, Cupertino, CA",
          employees: 164000,
          description:
            "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.",
        };
      });
    },
  });
}