import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { AppDispatch } from "../store/store";
import actions from "../store/actions";

const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(actions, dispatch);
};
export default useActions;