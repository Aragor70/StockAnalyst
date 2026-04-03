import { ChartActionsEnum } from "../../enums/chart";

export const chartLoading = () => ({
  type: ChartActionsEnum.Chart_Loading,
});

export const chartSuccess = (payload: any[]) => ({
  type: ChartActionsEnum.Chart_Success,
  payload,
});

export const chartError = (payload: any) => ({
  type: ChartActionsEnum.Chart_Error,
  payload,
});

import MarketService from "../../services/marketService";

export const loadChart = (symbol: string) => async (dispatch: any) => {
  try {
    dispatch(chartLoading());

    const service = MarketService.getInstance();
    const res = await service.loadChart(symbol);

    dispatch(chartSuccess(res));
  } catch (err) {
    dispatch(chartError(err));
  }
};