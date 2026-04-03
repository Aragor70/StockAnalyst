import { SummaryActionsEnum } from "../../enums/summary";

export interface SummaryState {
  loading: boolean;
  error: any;
  summary: any | null;
  profileLoading: boolean;
  profileError: any;
  profile: any | null;
}

export const initialState: SummaryState = {
  loading: false,
  error: null,
  summary: null,
  profileLoading: false,
  profileError: null,
  profile: null,
};

const summaryReducer = (
  state: SummaryState = initialState,
  action: { type: string; payload?: any }
): SummaryState => {
  switch (action.type) {
    case SummaryActionsEnum.Summary_Loading:
      return { ...state, loading: true };

    case SummaryActionsEnum.Summary_Success:
      return { ...state, loading: false, summary: action.payload };

    case SummaryActionsEnum.Summary_Error:
      return { ...state, loading: false, error: action.payload };

    case SummaryActionsEnum.More_Loading:
      return { ...state, profileLoading: true };

    case SummaryActionsEnum.More_Success:
      return { ...state, profileLoading: false, profile: action.payload };

    case SummaryActionsEnum.More_Error:
      return { ...state, profileLoading: false, profileError: action.payload };

    default:
      return state;
  }
};

export default summaryReducer;