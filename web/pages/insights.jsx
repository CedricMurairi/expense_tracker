import React from "react";
import MainLayout from "@components/layout/main_layout";
import UserData from "@mock/user_two.json";
import ExpenditureChart from "@components/insights/expenditure_chart";
import IncomeSavingsExpenditureChart from "@components/insights/income_expenditure_chart";

export default function DataInsights() {
  return (
    <MainLayout headerContent={"Data Insights"} page={"Insights"}>
      <div className="grid grid-cols-2 items-center gap-10">
        <div className="flex flex-col items-center">
          <h3 className="py-5">Expenditures</h3>
          <ExpenditureChart user_data={UserData} />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="py-5">Spending/Income/Savings</h3>
          <IncomeSavingsExpenditureChart user_data={UserData} />
        </div>
      </div>
    </MainLayout>
  );
}
