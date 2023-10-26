import React from "react";

export default function Button({ content, action }) {
  return (
    <button
      type="button"
      onClick={() => action()}
      className="text-white bg-slate-600 py-3 px-10 rounded-md"
    >
      {content}
    </button>
  );
}
