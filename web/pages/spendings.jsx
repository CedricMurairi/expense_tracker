import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/spending/form";
import UserData from "@mock/user_two.json";

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
      <div className="w-full">
        <div className="max-sm:text-[15px] max-sm:mb-3 text-xl flex flex-row justify-center items-center mb-5 font-bold">
          <p className=" bold py-1 text-green-500">In: {UserData["income"]} RWF</p>
          <span className="mx-2 text-gray-500">{"|"}</span>
          <p className=" bold py-1 text-orange-500">Out: {Math.round(spent)} RWF</p>
        </div>
        <Form />
      </div>
    </MainLayout>
  );
}
