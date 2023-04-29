import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/spending/form";
import UserData from "@mock/user_one.json";

export default function Spendings() {
  useEffect(() => {
    let spendings = 0;
    Object.keys(UserData["expenditures"]).map((entry) => {
      spendings += UserData["expenditures"][entry];
    });
    setSpent(spendings);
  }, []);

  const [spent, setSpent] = useState(0);

  return (
    <MainLayout headerContent="Spendings" page="Home">
      <div>
        <div className="text-xl bold py-1">
          Income: {UserData["income"]} RWF
        </div>
        <div className="text-xl bold py-1">Spent: {Math.round(spent)} RWF</div>
        <Form />
      </div>
    </MainLayout>
  );
}
