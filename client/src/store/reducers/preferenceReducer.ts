import { PreferenceActionsEnum } from "../../enums/preference";

export interface PreferenceState {
  loading: boolean;
  error: any;
  favorites: string[];
}

export const initialState: PreferenceState = {
  loading: false,
  error: null,
  favorites: [],
};

const preferenceReducer = (
  state: PreferenceState = initialState,
  action: { type: string; payload?: any }
): PreferenceState => {
  switch (action.type) {
    case PreferenceActionsEnum.Preference_Loading:
      return {
        ...state,
        loading: true,
      };

    case PreferenceActionsEnum.Preference_Success:
      return {
        ...state,
        loading: false,
        favorites: action.payload,
      };

    case PreferenceActionsEnum.Preference_Error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PreferenceActionsEnum.Add_Favorite:
      if (state.favorites.includes(action.payload)) return state;
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case PreferenceActionsEnum.Remove_Favorite:
      return {
        ...state,
        favorites: state.favorites.filter((s) => s !== action.payload),
      };

    default:
      return state;
  }
};

export default preferenceReducer;