import { WalletActionsEnum } from "../../enums/wallet";

export interface WalletPosition {
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
  shares: number;
}

export interface WalletState {
  loading: boolean;
  errors: any;
  positions: WalletPosition[];
  total: number;
  invested: number;
  profit: number;
}

export const initialState: WalletState = {
  loading: false,
  errors: {},
  positions: [],
  total: 0,
  invested: 0,
  profit: 0,
};

const WalletReducer = (
  state: WalletState = initialState,
  action: { type: string; payload?: any }
): WalletState => {
  const { type, payload } = action;

  switch (type) {
    case WalletActionsEnum.Wallet_Loading:
      return {
        ...state,
        loading: true,
      };

    case WalletActionsEnum.Wallet_Error:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case WalletActionsEnum.Wallet_Success:
      return {
        ...state,
        loading: false,
        positions: payload,
      };

    case WalletActionsEnum.Wallet_Add_Position:
      return recalc({
        ...state,
        positions: [...state.positions, payload],
      });

    case WalletActionsEnum.Wallet_Remove_Position:
      return recalc({
        ...state,
        positions: state.positions.filter((p) => p.symbol !== payload),
      });

    case WalletActionsEnum.Wallet_Update_Position:
      return recalc({
        ...state,
        positions: state.positions.map((p) =>
          p.symbol === payload.symbol
            ? { ...p, currentPrice: payload.currentPrice }
            : p
        ),
      });

    case WalletActionsEnum.Wallet_Recalculate:
      return recalc(state);

    default:
      return state;
  }
};

export default WalletReducer;

function recalc(state: WalletState): WalletState {
  const invested = state.positions.reduce(
    (sum, p) => sum + p.amount * p.buyPrice,
    0
  );

  const total = state.positions.reduce(
    (sum, p) => sum + p.amount * p.currentPrice,
    0
  );

  const profit = total - invested;

  return {
    ...state,
    invested,
    total,
    profit,
  };
}