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

    removeExpenditure: (state, action) => {
      state.value = {
        ...state.value,
        expenditures: state.value.expenditures.filter(
          (expenditure) => expenditure.id !== action.payload
        ),
      };
    },

    updateExpenditure: (state, action) => {
      state.value = {
        ...state.value,
        expenditures: state.value.expenditures.map((expenditure) => {
          if (expenditure.id === action.payload.id) {
            return action.payload;
          }
          return expenditure;
        }),
      };
    },

    updateMonthlySpendings: (state, action) => {
      state.value = {
        ...state.value,
        monthlySpendings: action.payload,
      };
    },

    clearData: (state) => {
      state.value = null;
    },
  },
});

export const {
  setData,
  clearData,
  addExpenditure,
  removeExpenditure,
  updateExpenditure,
  updateMonthlySpendings,
} = dataSlice.actions;
export default dataSlice.reducer;
