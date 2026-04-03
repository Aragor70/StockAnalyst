import { PreferenceActionsEnum } from "../../enums/preference";

export const preferenceLoading = () => ({
  type: PreferenceActionsEnum.Preference_Loading,
});

export const preferenceSuccess = (payload: string[]) => ({
  type: PreferenceActionsEnum.Preference_Success,
  payload,
});

export const preferenceError = (payload: any) => ({
  type: PreferenceActionsEnum.Preference_Error,
  payload,
});

export const addFavorite = (symbol: string) => ({
  type: PreferenceActionsEnum.Add_Favorite,
  payload: symbol,
});

export const removeFavorite = (symbol: string) => ({
  type: PreferenceActionsEnum.Remove_Favorite,
  payload: symbol,
});

export const loadFavorites = () => async (dispatch: any) => {
  try {
    dispatch(preferenceLoading());

    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

    dispatch(preferenceSuccess(saved));
  } catch (err) {
    dispatch(preferenceError(err));
  }
};