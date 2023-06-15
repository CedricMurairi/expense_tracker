import React, { useRef } from "react";
import {
  useSetIncomeMutation,
  useGetDataAndSettingsQuery,
} from "@data/base_api";
import Pulser from "@components/shared/pulser";

export default function UpdateIncomeForm() {
  const incomeRef = useRef(null);
  const currencyRef = useRef(null);
  const [setIncome, { isLoading }] = useSetIncomeMutation();

  const updateIncome = () => {
    if (incomeRef.current.value && currencyRef.current.value) {
      const body = {
        income: Number.parseInt(incomeRef.current.value),
        currency: currencyRef.current.value,
      };

      setIncome(JSON.stringify(body, null, 2))
        .then((result) => {
          if (result) {
            console.log(result);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <form className="flex flex-col">
      <input
        ref={incomeRef}
        className="text-sm text-slate-500 focus:outline-none border border-slate-200 rounded-md mb-1 py-1 px-2"
        type="text"
        placeholder="Monthly Income"
      />
      <select
        ref={currencyRef}
        className="text-sm text-slate-500 focus:outline-none border border-slate-200 rounded-md mb-1 py-1 px-2"
      >
        <option value="USD">USD</option>
        <option value="RWF">RWF</option>
        <option value="EUR">EUR</option>
      </select>
      <button
        onClick={() => updateIncome()}
        type="button"
        className="text-sm bg-slate-600 text-white rounded-md py-1 px-2"
      >
        {isLoading ? (
          <span className="flex justify-center items-center py-[2px]">
            <Pulser primary={"bg-gray-300"} secondary={"bg-white"} />
          </span>
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
}
