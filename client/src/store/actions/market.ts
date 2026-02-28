import { MarketActionsEnum } from "../../enums/market";
import MarketService from "../../services/marketService";

export const marketLoading = () => ({
  type: MarketActionsEnum.Market_Loading
});

export const marketSuccess = (payload: any) => ({
  type: MarketActionsEnum.Market_Success,
  payload
});

export const marketError = (payload: any) => ({
  type: MarketActionsEnum.Market_Error,
  payload
});

export const loadMarkets = () => async (dispatch: any) => {
  try {
    await dispatch(marketLoading());

    const symbols = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN"];
    const payload = await MarketService.getInstance().loadMarkets(symbols);

    dispatch(marketSuccess(payload));

  } catch (err) {
    dispatch(marketError(err));
  }
};