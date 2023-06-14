import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import UserData from "@mock/user_two.json";
import ExpenditureChart from "@components/insights/expenditure_chart";
import IncomeSavingsExpenditureChart from "@components/insights/income_expenditure_chart";
import { useSelector } from "react-redux";
import SelectElement from "@components/shared/select";
import ExpenditureActionDialog from "@components/spending/action_dialog";
import Months from "@mock/months.json";

export default function DataInsights() {
  const data = useSelector((state) => state.data.value);
  const [dataTarget, setDataTarget] = useState(0);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showActions, setShowActions] = useState(false);
  const [actionAmount, setActionAmount] = useState(0);
  const [actionCategory, setActionCategory] = useState("");
  const [actionId, setActionId] = useState(null);

  const colors = [
    "bg-slate-300",
    "bg-zinc-300",
    "bg-stone-300",
    "bg-gray-300",
    "bg-lime-300",
    "bg-yellow-300",
    "bg-amber-300",
    "bg-orange-300",
    "bg-red-300",
    "bg-emerald-300",
    "bg-green-300",
    "bg-teal-300",
    "bg-cyan-300",
    "bg-sky-300",
    "bg-fuchsia-300",
    "bg-pink-300",
    "bg-rose-300",
    "bg-purple-300",
    "bg-violet-300",
    "bg-indigo-300",
    "bg-blue-300",
  ];

  const updateCurrentMonth = (e) => {
    setCurrentMonth(Number.parseInt(e.target.value));
  };

  useEffect(() => {
    if (data) {
      setFilteredExpenditures(
        data?.expenditures.filter(
          (expenditure) =>
            new Date(expenditure.data.date).getMonth() === currentMonth
        )
      );
    }
  }, [currentMonth]);

  return (
    <MainLayout headerContent={""} page={"Insights"}>
      <div className="flex flex-row justify-center transition-all">
        {["Data", "Visualizations"].map((item, index) => (
          <button
            key={index}
            onClick={() => setDataTarget(index)}
            className={`${
              dataTarget === index ? "bg-slate-300" : "none"
            } border border-slate-300 px-5 py-1 ${
              index === 1 ? "rounded-r-2xl" : "rounded-l-2xl"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-1">
        <SelectElement
          fieldName="month"
          initialValue={currentMonth}
          action={updateCurrentMonth}
        >
          {Months.map((month, index) => {
            return (
              <option key={index} value={index}>
                {month}
              </option>
            );
          })}
        </SelectElement>
        <SelectElement
          disabled={true}
          initialValue={currentYear}
          fieldName="year"
          action={setCurrentYear}
        >
          <option value={2023}>{2023}</option>
        </SelectElement>
        <button
          onClick={() => setCurrentMonth(new Date().getMonth())}
          className="bg-red-50 rounded-md px-1 py-1 border border-gray-400"
        >
          Clear filter
        </button>
      </div>
      {dataTarget === 0 ? (
        <div className="overflow-auto max-h-[30vh] flex flex-col justify-start m-auto items-center w-[70%]">
          {showActions ? (
            <ExpenditureActionDialog
              actionAmount={actionAmount}
              actionCategory={actionCategory}
              actionId={actionId}
              setShowActions={setShowActions}
              setActionCategory={setActionCategory}
            />
          ) : null}
          {filteredExpenditures?.length === 0 ? (
            <p>No entry</p>
          ) : (
            filteredExpenditures?.map((expenditure, index) => {
              const randColor =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  onDoubleClick={() => {
                    setShowActions(true);
                    setActionAmount(expenditure.data.amount);
                    setActionCategory(expenditure.data.category);
                    setActionId(expenditure.id);
                  }}
                  key={index}
                  className="border-b w-full pt-1 pb-2 hover:bg-slate-200 hover:shadow-lg hover:shadow-slate-200 hover:px-3 px-2 transition-all"
                >
                  <div className="flex justify-between">
                    <p className="font-bold">
                      {expenditure.data.amount}
                      {data.currency}
                    </p>
                    <p className="text-sm">
                      {new Date(expenditure.data.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p
                      className={`flex justify-center items-center border rounded-full px-2 text-xs ${randColor}`}
                    >
                      {expenditure.data.category
                        .split(" ")
                        .filter((word) => word != "Expenditure")
                        .join(" ")}
                    </p>
                    <p className="text-sm">{expenditure.data.payment_type}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 items-center gap-10">
          {/* TODO: Fix visualization. Implement two more visualizations */}
          <div className="flex flex-col items-center">
            <h3 className="py-5">Expenditures</h3>
            <ExpenditureChart user_data={UserData} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="py-5">Spending/Income/Savings</h3>
            <IncomeSavingsExpenditureChart user_data={UserData} />
          </div>
        </div>
      )}
    </MainLayout>
  );
}
