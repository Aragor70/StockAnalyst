import { WalletPosition, WalletSummary } from "../services/walletService";

export const mockedWalletPositions: WalletPosition[] = [
  {
    symbol: "AAPL",
    amount: 10,
    buyPrice: 100,
    currentPrice: 108,
    shares: 0,
    currency: "USD"
  },
  {
    symbol: "TSLA",
    amount: 5,
    buyPrice: 70,
    currentPrice: 75,
    shares: 0,
    currency: "USD"
  },
  {
    symbol: "NVDA",
    amount: 2,
    buyPrice: 150,
    currentPrice: 190,
    shares: 0,
    currency: "USD"
  },
];

export const mockedWalletSummary: WalletSummary = {
  total: 108 * 10 + 75 * 5 + 190 * 2,
  invested: 100 * 10 + 70 * 5 + 150 * 2,
  profit:
    (108 * 10 + 75 * 5 + 190 * 2) -
    (100 * 10 + 70 * 5 + 150 * 2),
};