import React, { useState } from "react";
import formatNumber from "@helpers/format_number";
import { useSelector } from "react-redux";

export default function SavingsCard({
  savingMotif,
  amount,
  saved,
  installments_count,
  installments,
  payments,
  date_set,
  action,
}) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const state = useSelector((state) => state.data.value);

  const getTotalPayment = () => {
    const totalPaidAmount = payments !== null ? payments
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

  const progress = (getTotalPayment() / amount) * 100;

  return (
    <div
      className={`px-2 py-2 flex flex-row justify-between items-center w-[200px] max-sm:w-[80%] h-[80px] rounded-md border ${saved ? "border-green-700 border-2" : "border-gray-600"
        }`}
    >
      {showMoreDetails ?
        <div className="relative bg-white px-2 py-2 w-full">
          <button onClick={() => setShowMoreDetails(false)} className="absolute right-1 top-0 text-xs underline">Close</button>
          <h3 className="text-xs">{formatNumber(getTotalPayment())} / {state?.settings?.income?.currency}{formatNumber(amount)}</h3>
          <div className="flex justify-start items-center relative w-[90%] bg-gray-300 h-[5px] rounded-lg">
            <div className="bg-green-500 h-[5px] rounded-lg absolute" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex overflow-scroll gap-1 w-full justify-between mt-2">
            {
              payments.map((installment, index) =>
                <div key={index} className="flex flex-col text-xs justify-start items-center">
                  <button className={`px-2 py-1 font-bold rounded-lg ${installment.paid ? "bg-green-300" : installment.paymentDue < new Date().getMonth() ? "bg-red-300" : "bg-gray-300"}`}>{formatNumber(installment.amountPaid)}</button>
                </div>
              )
            }
          </div>
        </div> :
        <>
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-sm">{chopSentence(savingMotif, 15)}</h3>
            <p className="text-lg font-bold">
              {state?.settings?.income?.currency}
              {installments_count > 1
                ? formatNumber(amount / installments_count)
                : formatNumber(amount)}
            </p>
            <p className="w-fit bg-indigo-100 rounded-lg px-1 text-[10px]">{new Date(date_set).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col justify-between items-end h-full">
            {saved ?
              <span
                className="bg-green-500 text-center rounded-sm px-2 py-1 text-xs"
              >
                Saved
              </span> :
              <button onClick={() => action(true)} className="text-xs underline bg-gray-400 px-2 py-1 rounded-sm">
                Save Now
              </button>
            }
            {installments ?
              <button onClick={() => setShowMoreDetails(true)} className="underline text-sm">See more</button>
              : <></>
            }
          </div>
        </>
      }

    </div >
  );
}
