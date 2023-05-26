import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import infoReducer from "./infoSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        info: infoReducer,
    },
});