import React from "react";

export default function Label({ content, handler, active }) {
  return (
    <div
      className={`${
        active ? "bg-orange-200" : "bg-none"
      } flex py-2 px-3 rounded-lg border border-gray-400 w-fit cursor-pointer`}
      onClick={handler}
    >
      {content.split(" ").filter(word => word !== "Expenditure").join(" ")}
    </div>
  );
}
