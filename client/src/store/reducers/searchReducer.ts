import { SearchActionsEnum } from "../../enums/search";

export interface SearchState {
  loading: boolean;
  errors: any;
  response: any[];
}

export const initialState: SearchState = {
  response: [],
  loading: true,
  errors: {},
};

const searchReducer = (
  state: SearchState = initialState,
  action: { type: string; payload?: any }
): SearchState => {
  const { type, payload } = action;

  switch (type) {
    case SearchActionsEnum.Search_Loading:
      return {
        ...state,
        loading: true
      };

    case SearchActionsEnum.Search_Success:
      return {
        ...state,
        response: payload,
        loading: false
      };

    case SearchActionsEnum.Search_Error:
      return {
        ...state,
        errors: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default searchReducer;