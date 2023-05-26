import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "info",
  initialState: {
    value: {
      message: "",
      type: "",
      show: false,
    },
  },

  reducers: {
    setInfo: (state, action) => {
      state.value = action.payload;
    },

    clearInfo: (state) => {
        state.value = {
            message: "",
            type: "",
            show: false,
        };
    },
  },
});

export const { setInfo, clearInfo } = infoSlice.actions;
export default infoSlice.reducer;
