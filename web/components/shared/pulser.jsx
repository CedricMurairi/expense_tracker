import React from "react";

export default function Pulser({ primary, secondary }) {
  return (
    <span className="relative flex h-4 w-4">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${secondary} opacity-75`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-4 w-4 ${primary}`}
      ></span>
    </span>
  );
}
