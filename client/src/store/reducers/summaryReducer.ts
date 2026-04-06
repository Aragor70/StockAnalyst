import { SummaryActionsEnum } from "../../enums/summary";

export interface CompanySummary {
  longName: string;
  sector: string;
  industry: string;
  marketCap: number;
  website: string;
}

export interface CompanyMore {
  address: string;
  employees: number;
  description: string;
}

export interface SummaryState {
  loading: boolean;
  moreLoading: boolean;
  summary: CompanySummary | null;
  more: CompanyMore | null;
  moreError: any;
  error: any;
}

export const initialState: SummaryState = {
  loading: false,
  error: null,
  summary: null,
  moreLoading: false,
  moreError: null,
  more: null,
};

const summaryReducer = (
  state: SummaryState = initialState,
  action: { type: string; payload?: any }
): SummaryState => {
  switch (action.type) {
    case SummaryActionsEnum.Summary_Loading:
      return { ...state, loading: true };

    case SummaryActionsEnum.Summary_Success:
      return { ...state, loading: false, summary: action.payload.summary, more: action.payload.more };

    case SummaryActionsEnum.Summary_Error:
      return { ...state, loading: false, error: action.payload };

    case SummaryActionsEnum.More_Loading:
      return { ...state, moreLoading: true };

    case SummaryActionsEnum.More_Success:
      return { ...state, moreLoading: false, more: action.payload };

    case SummaryActionsEnum.More_Error:
      return { ...state, moreLoading: false, moreError: action.payload };

    default:
      return state;
  }
};

export default summaryReducer;