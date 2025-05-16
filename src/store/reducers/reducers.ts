// store/reducers/reducers.ts

import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const themePersistConfig = {
  key: 'theme',
  storage,
};

const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, themeReducer),
});

export default rootReducer;
