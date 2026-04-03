import { SearchActionsEnum } from "../../enums/search";
import SearchService from "../../services/searchService";

export const searchLoading = () => ({
  type: SearchActionsEnum.Search_Loading
});

export const searchSuccess = (payload: any) => ({
  type: SearchActionsEnum.Search_Success,
  payload
});

export const searchError = (payload: any) => ({
  type: SearchActionsEnum.Search_Error,
  payload
});

export const searchTickers = (symbol: string) => async (dispatch: any) => {
  try {
    await dispatch(searchLoading());

    const payload = await SearchService.getInstance().searchTickers({ symbol });

    dispatch(searchSuccess(payload));

  } catch (err) {
    dispatch(searchError(err));
  }
};