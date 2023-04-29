import React from "react";

export default function SavingsCard({
  savingMotif,
  amount,
  saved,
  allocations,
}) {
  function formatNumber(num) {
    if (num >= 1000 && num < 1000000) {
      const formatted = (num / 1000).toFixed(1);
      return formatted.replace(/\.0$/, "") + "k";
    } else if (num >= 1000000) {
      const formatted = (num / 1000000).toFixed(1);
      return formatted.replace(/\.0$/, "") + "m";
    } else {
      return num.toString();
    }
  }

  return (
    <div
      className={`px-2 py-2 flex flex-row justify-between items-center w-[200px] h-[80px] rounded-md border ${
        saved ? "border-green-700 border-2" : "border-gray-600"
      }`}
    >
      <div className="flex flex-col justify-start h-full">
        <h3 className="text-sm">{savingMotif}</h3>
        {/* On saving card show how much to pay a month as per allocations.
        Use a tooltip to show the total amount to be saved and the duration and the amount to be paid per month
        Show Progress indicator on the savings card to show how much of the total savings has bee paid */}
        <p className="text-xl font-bold mt-1">
          {"RWF"}
          {allocations > 1
            ? formatNumber(amount / allocations)
            : formatNumber(amount)}
        </p>
      </div>
      <div className="flex flex-col justify-items-start items-end h-full">
        <span
          className={`${
            saved ? "bg-green-500" : "bg-gray-400"
          } text-center rounded-sm py-[1px] px-[3px] text-[11px] w-fit`}
        >
          {saved ? "Saved" : "Not Saved"}
        </span>
        <button className="text-xs underline mt-4">
          {!saved ? "Save Now" : ""}
        </button>
      </div>
    </div>
  );
}
