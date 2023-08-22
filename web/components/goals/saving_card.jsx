import React, { useState } from "react";
import formatNumber from "@helpers/format_number";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentGoal, setCurrentInstallment } from "@store/dataSlice";

export default function SavingsCard({
  action,
  goal,
  id,
}) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const state = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

  const getTotalPayment = () => {
    const totalPaidAmount = goal.installments ? goal.payments
      .filter((payment) => payment.paid === true)
      .reduce((acc, curr) => acc + curr.amountPaid, 0) : 0;

    return totalPaidAmount;
  }

  function chopSentence(text, characterLimit) {
    if (text.length <= characterLimit) {
      return text;
    } else {
      return text.slice(0, characterLimit - 3) + "...";
    }
  }

  const progress = (getTotalPayment() / goal.amount) * 100;

  return (
    <div
      className={`px-2 py-2 flex flex-row justify-between items-center w-[200px] max-sm:w-[80%] h-[80px] rounded-md border border-gray-300 ${goal.paid ? "bg-green-50" : new Date(goal.set).toLocaleDateString() < new Date().toLocaleDateString() && !goal.installments ? "bg-red-50" : "bg-white"
        }`}
    >
      {showMoreDetails ?
        <div className="relative bg-white px-2 py-2 w-full">
          <button onClick={() => setShowMoreDetails(false)} className="absolute right-1 top-0 text-xs underline">Close</button>
          <h3 className="text-xs">{formatNumber(getTotalPayment())} / {state?.settings?.income?.currency}{formatNumber(goal.amount)}</h3>
          <div className="flex justify-start items-center relative w-[90%] bg-gray-300 h-[5px] rounded-lg">
            <div className="bg-green-500 h-[5px] rounded-lg absolute" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex overflow-scroll gap-1 w-full justify-between mt-2">
            {
              goal.payments.map((installment, index) =>
                <div key={index} className="flex flex-col text-xs justify-start items-center">
                  <button className={`px-2 py-1 font-bold rounded-lg ${installment.paid ? "bg-green-300" : installment.paymentDue < new Date().getMonth() ? "bg-red-300" : "bg-gray-300"}`}>{formatNumber(installment.amountPaid)}</button>
                </div>
              )
            }
          </div>
        </div> :
        <>
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-sm">{chopSentence(goal.motif, 15)}</h3>
            <p className="text-lg font-bold">
              {state?.settings?.income?.currency}
              {goal.installments_count > 1
                ? formatNumber(goal.amount / goal.installments_count)
                : formatNumber(goal.amount)}
            </p>
            <p className="w-fit bg-indigo-100 rounded-lg px-1 text-[10px]">{new Date(goal.set).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col justify-between items-end h-full">
            {goal.paid ?
              <span
                className="bg-green-500 text-center rounded-sm px-2 py-1 text-xs"
              >
                Saved
              </span> :
              <button onClick={() => {
                action(true);
                dispatch(setCurrentGoal({ id: id, data: goal }));
              }}
                className="text-xs underline bg-gray-400 px-2 py-1 rounded-sm">
                Save Now
              </button>
            }
            {goal.installments ?
              <button onClick={() => setShowMoreDetails(true)} className="underline text-sm">See more</button>
              : <></>
            }
          </div>
        </>
      }

    </div >
  );
}
