import React from "react";

export default function SelectElement({
  initialValue,
  action,
  fieldName,
  disabled,
  children,
}) {
  return (
    <select
      disabled={disabled}
      name={fieldName}
      defaultValue={initialValue}
      onChange={action}
      className="px-5 py-2 my-5 border rounded-md border-gray-400"
    >
      {children}
    </select>
  );
}
