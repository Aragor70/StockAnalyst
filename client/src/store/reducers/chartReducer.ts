import { ChartPoint } from "../../components/common/InvestmentChart/InvestmentChart";
import { ChartActionsEnum } from "../../enums/chart";

export interface ChartState {
  loading: boolean;
  error: any;
  chart: ChartPoint[];
}

export const initialState: ChartState = {
  loading: false,
  error: null,
  chart: [],
};

const chartReducer = (
  state: ChartState = initialState,
  action: { type: string; payload?: any }
): ChartState => {
  switch (action.type) {
    case ChartActionsEnum.Chart_Loading:
      return { ...state, loading: true };

    case ChartActionsEnum.Chart_Success:
      return { ...state, loading: false, chart: action.payload };

    case ChartActionsEnum.Chart_Error:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default chartReducer;