import { LanguageActionsEnum } from "../../enums/language";
import { ItemType } from "../../types/common";

export interface LanguageState {
  loading: boolean;
  errors: any;
  data: ItemType<string> | null;
  languageCode: string | null;
}

export const initialState: LanguageState = {
  loading: true,
  errors: {},
  data: null,
  languageCode: null
};

const languageReducer = (
  state: LanguageState = initialState,
  action: { type: string; payload?: any }
): LanguageState => {
  const { type, payload } = action;

  switch (type) {
    case LanguageActionsEnum.Language_Loading:
      return {
        ...state,
        loading: true
      };

    case LanguageActionsEnum.Language_Success:
      return {
        ...state,
        data: payload.data,
        languageCode: payload.languageCode,
        loading: false
      };

    case LanguageActionsEnum.Language_Error:
      return {
        ...state,
        errors: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default languageReducer;