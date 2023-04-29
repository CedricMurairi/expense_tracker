import React from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/goals/form";
import Savings from "@mock/goals";
import SavingsCard from "@components/goals/saving_card";

export default function Goals() {
  return (
    <MainLayout headerContent={"Saving Goals"} page={"Goals"}>
      {/* Make sure to show every month if the saving goal has been met -- find a way */}
      {/* On click to save now, people get to choose Mobile money or bank to put the money away */}
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
