import React, { useState } from "react";
import formatNumber from "@helpers/format_number";

export default function SavingsCard({
  savingMotif,
  amount,
  saved,
  installments_count,
  installments,
  payments
}) {
  const [showMoreDetails, setShowModeDetails] = useState(false)

  return (
    <div
      className={`px-2 py-2 flex flex-row justify-between items-center w-[200px] max-sm:w-[80%] h-[80px] rounded-md border ${saved ? "border-green-700 border-2" : "border-gray-600"
        }`}
    >
      {showMoreDetails ?
        <div className="relative bg-white px-2 py-2 w-full">
          <button onClick={() => setShowModeDetails(false)} className="absolute right-2 top-0 text-xs underline">Close</button>
          <h3>{formatNumber(payments)} / {formatNumber(amount)}</h3>
          <div className="flex justify-start items-center relative w-[90%] bg-gray-300 h-[5px] rounded-lg">
            <div className="bg-green-500 w-[90%] h-[5px] rounded-lg absolute"></div>
          </div>
          <div>
            {/* {Object.create() installments .maps((installment) => {
              <span>{installment}</span>
            })} */}
          </div>
        </div> :
        <>
          <div className="flex flex-col justify-start h-full">
            <h3 className="text-sm">{savingMotif}</h3>
            <p className="text-xl font-bold mt-1">
              {"RWF"}
              {installments_count > 1
                ? formatNumber(amount / installments_count)
                : formatNumber(amount)}
            </p>
          </div>
          <div className="flex flex-col justify-between items-end h-full">
            {saved ?
              <span
                className="bg-green-500 text-center rounded-sm px-2 py-1 text-xs"
              >
                Saved
              </span> :
              <button className="text-xs underline bg-gray-400 px-2 py-1 rounded-sm">
                Save Now
              </button>
            }
            {installments ?
              <button onClick={() => setShowModeDetails(true)} className="underline text-sm">See more</button>
              : <></>
            }
          </div>
        </>
      }

    </div >
  );
}
