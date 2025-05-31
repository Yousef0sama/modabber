"use client";

// imports

// providers
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// redux
import store, { persistor } from "@/store/index";

// interfaces

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
