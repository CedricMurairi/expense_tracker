import React from "react";

export default function SelectElement({
  initialValue,
  action,
  fieldName,
  disabled,
  children,
  width,
  reference,
}) {
  return (
    <select
      ref={reference}
      disabled={disabled}
      name={fieldName}
      value={initialValue}
      onChange={action}
      className={`px-5 py-2 my-5 border rounded-md border-gray-400 ${width}`}
    >
      {children}
    </select>
  );
}
