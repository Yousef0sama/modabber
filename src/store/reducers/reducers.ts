// ================= Imports ==================

// Redux
import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import notificationsReducer from "../features/notificationsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// ================ Reducers ===================

/**
 * Configuration for persisting the theme slice in localStorage
 */
const themePersistConfig = {
  key: "theme",
  storage,
};

/**
 * @description
 * Root reducer combining all feature reducers.
 * The theme reducer is wrapped with persistReducer to enable state persistence.
 */
const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, themeReducer),
  notifications: notificationsReducer,
});

export default rootReducer;
