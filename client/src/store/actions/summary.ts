import { SummaryActionsEnum } from "../../enums/summary";
import MarketService from "../../services/marketService";

export const summaryLoading = () => ({
  type: SummaryActionsEnum.Summary_Loading,
});

export const summarySuccess = (payload: any) => ({
  type: SummaryActionsEnum.Summary_Success,
  payload,
});

export const summaryError = (payload: any) => ({
  type: SummaryActionsEnum.Summary_Error,
  payload,
});

export const profileLoading = () => ({
  type: SummaryActionsEnum.More_Loading,
});

export const profileSuccess = (payload: any) => ({
  type: SummaryActionsEnum.More_Success,
  payload,
});

export const profileError = (payload: any) => ({
  type: SummaryActionsEnum.More_Error,
  payload,
});

export const loadSummary = (symbol: string) => async (dispatch: any) => {
  try {
    dispatch(summaryLoading());

    const service = MarketService.getInstance();
    const res = await service.loadSummary(symbol);

    dispatch(summarySuccess(res));
  } catch (err) {
    dispatch(summaryError(err));
  }
};

