import React from "react";

export default function Label({ content, handler, active }) {
  return (
    <div
      className={`${
        active ? "bg-green-200" : "bg-none"
      } py-2 px-3 rounded-lg border border-gray-400 w-fit cursor-pointer`}
      onClick={handler}
    >
      {content}
    </div>
  );
}
