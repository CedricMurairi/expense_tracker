import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/spending/form";
import UserData from "@mock/user_two.json";
import { auth } from "firebaseconfig";

export default function Spendings() {
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    let spendings = 0;
    Object.keys(UserData["expenditures"]).forEach((entry) => {
      spendings += UserData["expenditures"][entry];
    });
    setSpent(spendings);
  }, []);

  return (
    <MainLayout headerContent="Spendings" page="Home">
      <div>
        <div className="text-xl bold py-1">
          Income: {UserData["income"]} RWF
        </div>
        <div className="text-xl bold py-1">Spent: {Math.round(spent)} RWF</div>
        <div className="text-xl bold py-1">
          {auth.currentUser?.displayName}
        </div>
        <Form />
      </div>
    </MainLayout>
  );
}
