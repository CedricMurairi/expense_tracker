import React from "react";

export default function PaymentTypeSelector({ content, handler, active }) {
  return (
    <div
      onClick={handler}
      className={`${
        active ? "bg-green-200" : "bg-none"
      } max-sm:text-sm max-sm:px-2 max-sm:py-2 text-center rounded-md py-3 px-5 border border-gray-400 cursor-pointer`}
    >
      {content}
    </div>
  );
}
