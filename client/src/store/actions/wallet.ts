import { WalletActionsEnum } from "../../enums/wallet";
import WalletService from "../../services/walletService";
import { WalletPosition } from "../reducers/walletReducer";

export const walletLoading = () => ({
  type: WalletActionsEnum.Wallet_Loading,
});

export const walletError = (err: any) => ({
  type: WalletActionsEnum.Wallet_Error,
  payload: err,
});

export const walletSuccess = (positions: WalletPosition[]) => ({
  type: WalletActionsEnum.Wallet_Success,
  payload: positions,
});

export const addPosition = (position: WalletPosition) => ({
  type: WalletActionsEnum.Wallet_Add_Position,
  payload: position,
});

export const removePosition = (symbol: string) => ({
  type: WalletActionsEnum.Wallet_Remove_Position,
  payload: symbol,
});

export const updatePosition = (symbol: string, currentPrice: number) => ({
  type: WalletActionsEnum.Wallet_Update_Position,
  payload: { symbol, currentPrice },
});

export const recalcWallet = () => ({
  type: WalletActionsEnum.Wallet_Recalculate,
});

export const getWallet = () => async (dispatch: any) => {
  try {
    await dispatch(walletLoading());

    const payload = await WalletService.getInstance().loadWallet();

    dispatch(walletSuccess(payload));

  } catch (err) {
    dispatch(walletError(err));
  }
};