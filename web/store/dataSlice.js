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

    updateSettings: (state, action) => {
      state.value = {
        ...state.value,
        settings: {
          ...state.value.settings,
          ...action.payload,
        },
      };
    },

    setGoal: (state, action) => {
      if (state.value === null) {
        state.value = {
          goals: [action.payload],
        };
      } else {
        state.value = {
          ...state.value,
          goals: [...state.value.goals, action.payload],
        };
      }
    },

    updateGoal: (state) => {
      state.value = {
        ...state.value,
        goals: state.value.goals.map((goal) => {
          if (goal.id === action.payload.id) {
            return action.payload;
          }
          return goal;
        }),
      };
    },

    setCurrentGoal: (state, action) => {
      state.value = {
        ...state.value,
        currentGoal: action.payload,
      };
    },

    setCurrentInstallment: (state, action) => {
      state.value = {
        ...state.value,
        currentInstallment: action.payload,
      };
    },

    clearCurrentGoalInfo: (state) => {
      state.value = {
        ...state.value,
        currentGoal: null,
        currentInstallment: null,
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
  clearCurrentGoalInfo,
  addExpenditure,
  removeExpenditure,
  updateExpenditure,
  updateMonthlySpendings,
  updateSettings,
  setCurrentGoal,
  setCurrentInstallment,
} = dataSlice.actions;
export default dataSlice.reducer;
