import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import infoReducer from "./infoSlice";
import dataReducer from "./dataSlice";
import { baseApi } from "@data/base_api";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "data"],
};

const reducers = combineReducers({
  user: userReducer,
  info: infoReducer,
  data: dataReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware);
  },
});

setupListeners(makeStore.dispatch);

export const persistor = persistStore(makeStore);
