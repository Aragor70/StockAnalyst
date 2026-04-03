export type ItemType<ValueType> = {
    [key: string]: ValueType
}

export type StockInfoType = {
  symbol: string;
  price: number;
  change: number;
  percent: number;
}