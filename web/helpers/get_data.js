import React from "react";
import getExpenditures from "@helpers/get_expenditures";
import {
  setData,
  updateMonthlySpendings,
  addExpenditure,
} from "@store/dataSlice";
import { db, auth } from "firebaseconfig";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { makeStore } from "@store/index";

const getData = async (dispatch) => {
  const expenditures = await getExpenditures();
  const monthlySpendings = getMonthlySpendings(expenditures);

  dispatch(setData({ expenditures, monthlySpendings }));
};

// TODO: Debug this function
export const listenForData = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      const unsubscribe = onSnapshot(
        collection(db, `expenditures/${user.uid}/expenditures`),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const newExpenditure = {
                data: change.doc.data(),
                id: change.doc.id,
              };
              dispatch(addExpenditure(newExpenditure));
              const freshExpenditures =
                makeStore.getState().data.value.expenditures;
              dispatch(
                updateMonthlySpendings(getMonthlySpendings(freshExpenditures))
              );
            }
            if (change.type === "modified") {
              // console.log("Modified expenditure", change.doc.data());
            }
            if (change.type === "removed") {
              // console.log("Removed expenditure", change.doc.data());
            }
          });
        }
      );

      return unsubscribe;
    }
  });
};

export default getData;

export const getMonthlySpendings = (spendings) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return spendings
    .filter((expenditure) => {
      const expenditureDate = new Date(expenditure.data.date);
      return (
        expenditureDate.getMonth() === currentMonth &&
        expenditureDate.getFullYear() === currentYear
      );
    })
    .reduce((total, expenditure) => {
      return total + parseFloat(expenditure.data.amount);
    }, 0);
};
