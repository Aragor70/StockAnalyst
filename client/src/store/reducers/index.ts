import { combineReducers } from '@reduxjs/toolkit';
import marketReducer from './marketReducer';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
  market: marketReducer,
  language: languageReducer
});

export default rootReducer;