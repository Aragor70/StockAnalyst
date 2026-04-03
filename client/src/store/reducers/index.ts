import { combineReducers } from '@reduxjs/toolkit';

import marketReducer from './marketReducer';
import languageReducer from './languageReducer';
import walletReducer from './walletReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import chartReducer from './chartReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
  market: marketReducer,
  language: languageReducer,
  wallet: walletReducer,
  search: searchReducer,
  user: userReducer,
  chart: chartReducer,
  summary: summaryReducer,
});

export default rootReducer;