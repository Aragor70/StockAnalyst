import { MarketActionsEnum } from "../../enums/market";
import MarketService from "../../services/marketService";
import { loadChart } from "./chart";
import { loadSummary } from "./summary";

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

export const loadMarkets = (symbols: string[]) => async (dispatch: any) => {
  try {
    await dispatch(marketLoading());

    const payload = await MarketService.getInstance().loadMarkets(symbols);

    dispatch(marketSuccess(payload));

  } catch (err) { 
    dispatch(marketError(err));
  }
};
export const loadMarket = (symbol: string) => async (dispatch: any) => {
  try {
    await dispatch(marketLoading());

    const payload = await MarketService.getInstance().loadMarkets([symbol]);

    dispatch(loadChart(symbol));
    dispatch(loadSummary(symbol));

    dispatch(marketSuccess(payload));

  } catch (err) { 
    dispatch(marketError(err));
  }
};