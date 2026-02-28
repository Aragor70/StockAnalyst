import { LanguageActionsEnum } from "../../enums/language";

import LanguageService from "../../services/languageService";

export const init = () => async (dispatch: any) =>{

    return await dispatch(setLanguage("en"));
}

const setLanguage = (languageCode: string) => async (dispatch: any) => {

    await dispatch({type: LanguageActionsEnum.Language_Loading});

    const languageService = new LanguageService();

    const res = await languageService.getLanguage(languageCode);

    dispatch({
        type: LanguageActionsEnum.Language_Success,
        payload: {
            languageCode,
            data: res.data
        }
    });

}