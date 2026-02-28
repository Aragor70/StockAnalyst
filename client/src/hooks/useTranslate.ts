import _ from "lodash";

import { ItemType } from "../types/common";
import useTypedSelector from "./useTypedSelector";

const useTranslate = () => {

    const languageData = useTypedSelector(state => state.language.data);

    const translateFn = (path: string, options?: ItemType<string>) => {
        return resolvePathFn(languageData, path, options);
    }
    return {
        t: translateFn
    }
}
export default useTranslate;

const resolvePathFn = (translation: ItemType<string> | null, path: string, options?: ItemType<string>): string => {

    if (_.isEmpty(translation)) return "";

    const output: string = translation?.[path] ?? "";

    if (_.isEmpty(options)) return output;

    return output.replace(/{{([^}]*)}}/g, (_match, key) => (

        _.get(options, key) ?? ""

    ));
}