import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import infoReducer from "./infoSlice";
import dataReducer from "./dataSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "info", "data"],
};

const reducers = combineReducers({
  user: userReducer,
  info: infoReducer,
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(makeStore);
