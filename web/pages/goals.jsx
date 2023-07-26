import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/goals/form";
import SavingsCard from "@components/goals/saving_card";
import { setData } from "@store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetGoalsQuery } from "@data/base_api";
import Pulser from "@components/shared/pulser";

export default function Goals() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data.value)
  const { data, isLoading } = useGetGoalsQuery();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payWithMono, setPayWithMono] = useState(false);
  const [payWithBank, setPayWithBank] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setData({ goals: data }))
    }
  }, [data])

  return (
    <MainLayout headerContent={"Saving Goals"} page={"Goals"}>
      {showPaymentForm &&
        <div className="rounded-md max-md:w-[70%] max-sm:w-[80%] max-sm:h-[50%] w-[50%] h-[100%] fixed flex flex-col justify-center items-center top-0 max-sm:left-[10%] max-md:left-[15%] left-[25%] border bg-white shadow-2xl">
          {showInfo && <div className="px-2 py-2 text-center text-[10px] w-[60%] border rounded-lg shadow-2xl">Now you can only mimic saving -- In-app saving requires third party API integration with Momo and Banks. This feature will be available as we go.</div>}
          <button
            onClick={() => setShowPaymentForm(false)}
            className="absolute right-5 top-2 text-xs underline"
          >
            Close
          </button>
          <h1 className="font-bold flex justify-center items-center gap-1">
            Save To Your Accounts
            <span
              onClick={() => setShowInfo(!showInfo)}
            >
              <img className="cursor-pointer" width="20" height="20" src="https://img.icons8.com/ios/50/how-quest--v2.png" alt="how-quest--v2" />
            </span>
          </h1>
          <div className="z-10 flex gap-1 text-sm my-5">
            <button className={`${payWithMono ? "bg-gray-200" : "bg-gray-100"} py-2 px-3 rounded-md`} onClick={() => {
              setPayWithMono(true)
              setPayWithBank(false)
            }}>Mobile Money</button>
            <button className={`${payWithBank ? "bg-gray-200" : "bg-gray-100"} py-2 px-3 rounded-md`} onClick={() => {
              setPayWithMono(false)
              setPayWithBank(true)
            }}>Bank Account</button>
          </div>
          {payWithMono &&
            <div className="z-10 flex flex-col gap-1 justify-center">
              <input type="tel" className="outline-none border border-gray-200 rounded-md py-1 px-2" placeholder="Phone number" />
              <input type="text" className="outline-none border border-gray-200 rounded-md py-1 px-2" value={200000} />
              <button
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
                className="text-sm px-2 py-1 hover:bg-gray-100 border border-gray-200 rounded-lg relative"
              >
                Save Now
                {showTip &&
                  <span className="absolute left-[15%] top-[100%] text-xs">
                    This will mimic the save action
                  </span>
                }
              </button>
            </div>
          }
          {payWithBank &&
            <div>Coming soon ...</div>
          }
        </div>
      }
      <div className="z-10 flex justify-center items-center flex-col">
        <Form />
        {isLoading ?
          <div className="flex justify-center items-center"><Pulser primary={"bg-gray-300"} secondary={"bg-gray-600"} /></div>
          :
          <div className="flex flex-wrap justify-center gap-2">
            {state?.goals?.map((goal) => {
              return (
                <SavingsCard
                  action={setShowPaymentForm}
                  key={goal?.id}
                  amount={goal?.data.amount}
                  installments_count={goal?.data.installments_count}
                  savingMotif={goal?.data.motif}
                  saved={goal?.data.paid}
                  installments={goal?.data.installments}
                  payments={goal?.data.payments || null}
                  date_set={goal?.data.set}
                />
              );
            })}
          </div>
        }
      </div>
    </MainLayout>
  );
}
