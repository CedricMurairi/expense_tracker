import React from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/goals/form";
import Savings from "@mock/goals";
import SavingsCard from "@components/goals/saving_card";

export default function Goals() {
  return (
    <MainLayout headerContent={"Saving Goals"} page={"Goals"}>
      <div className="">
        <Form />
        <div className="grid grid-cols-3 gap-2">
          {Savings.map((saving, index) => {
            return (
              <SavingsCard
                key={index}
                amount={saving.amount}
                allocations={saving.allocations}
                savingMotif={saving.motif}
                saved={saving.saved}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
