// =================== Imports ===================

// Redux
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducers";
import { persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

/**
 * @description
 * Configure the Redux store with persistence enabled.
 * Initializes the store with the rootReducer.
 * Disables serializable state invariant middleware for certain redux-persist actions to avoid warnings.
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializable state check middleware
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Persistor object responsible for persisting the Redux store state to local storage.
 */
export const persistor = persistStore(store);

/**
 * Type for the entire Redux state tree.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for the Redux dispatch function.
 */
export type AppDispatch = typeof store.dispatch;

export default store;
