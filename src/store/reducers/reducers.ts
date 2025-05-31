// imports

// redux
import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import notificationsReducer from "../features/notificationsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const themePersistConfig = {
  key: "theme",
  storage,
};

const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, themeReducer),
  notifications: notificationsReducer,
});

export default rootReducer;
