import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: null,
  },
  reducers: {
    setData: (state, action) => {
      if (state.value === null) {
        state.value = action.payload;
      } else {
        state.value = {
          ...state.value,
          ...action.payload,
        };
      }
    },

    addExpenditure: (state, action) => {
      if (state.value === null) {
        state.value = {
          expenditures: [action.payload],
        };
      } else {
        state.value = {
          ...state.value,
          expenditures: [...state.value.expenditures, action.payload],
        };
      }
    },

    updateMonthlySpendings: (state, action) => {
      if (state.value === null) {
        state.value = {
          monthlySpendings: action.payload,
        };
      } else {
        state.value = {
          ...state.value,
          monthlySpendings: action.payload,
        };
      }
    },

    clearData: (state) => {
      state.value = null;
    },
  },
});

export const { setData, clearData, addExpenditure, updateMonthlySpendings } =
  dataSlice.actions;
export default dataSlice.reducer;
