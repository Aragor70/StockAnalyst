import { MarketActionsEnum } from "../../enums/market";

export interface MarketState {
  loading: boolean;
  errors: any;
  positions: any[];
  position: any;
}

export const initialState: MarketState = {
  position: null,
  loading: true,
  errors: {},
  positions: [],
};

const marketReducer = (
  state: MarketState = initialState,
  action: { type: string; payload?: any }
): MarketState => {
  const { type, payload } = action;

  switch (type) {
    case MarketActionsEnum.Market_Loading:
      return {
        ...state,
        loading: true
      };

    case MarketActionsEnum.Market_Success:
      return {
        ...state,
        positions: payload,
        loading: false
      };

    case MarketActionsEnum.Market_Error:
      return {
        ...state,
        errors: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default marketReducer;