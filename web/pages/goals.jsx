import React, { useEffect } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/goals/form";
import Savings from "@mock/goals";
import SavingsCard from "@components/goals/saving_card";
import { setData } from "@store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetGoalsQuery } from "@data/base_api";

export default function Goals() {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.data.value.goals) || []
  const { data, isLoading } = useGetGoalsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setData({ goals: data }))
    }
  }, [data])

  return (
    <MainLayout headerContent={"Saving Goals"} page={"Goals"}>
      <div className="">
        <Form />
        <div className="flex flex-wrap justify-center gap-2">
          {goals.map((goal) => {
            console.log(goal)
            return (
              <SavingsCard
                key={goal.id}
                amount={goal.data.amount}
                installments_count={goal.data.installments_count}
                savingMotif={goal.data.motif}
                saved={goal.data.paid}
                installments={goal.data.installments}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
