import "@styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, makeStore } from "@store/index";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={makeStore} >
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
