import React, { useState } from "react";
import Labels from "@mock/labels.json";
import Label from "@components/shared/label";
import PaymentTypes from "@mock/payment_type.json";
import PaymentTypeSelector from "@components/shared/payment_type";
import Button from "@components/shared/button";
import useWindowSize from "@hooks/window_size";

export default function Form() {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const size = useWindowSize();

  const handleLabelClick = (index) => {
    setSelectedLabel(index);
  };

  const handlePaymentTypeClick = (index) => {
    setSelectedPayment(index);
  };
  return (
    <div>
      <form className="flex flex-col items-center mb-10">
        <div className="flex flex-row gap-2 justify-center">
          {PaymentTypes.map((paymentType, index) => {
            return (
              <PaymentTypeSelector
                key={index}
                content={paymentType}
                active={index === selectedPayment}
                handler={() => {
                  handlePaymentTypeClick(index);
                }}
              />
            );
          })}
        </div>
        <div className="w-[50%] flex flex-row items-center justify-center">
          <input
            className="px-5 py-2 my-5 border rounded-md border-gray-400"
            type="text"
            placeholder="Amount"
          />
          <span className="ml-2 text-2xl">RWF</span>
        </div>
        <Button content={"Record"} />
      </form>
      {size.width < 1100 ? (
        <div className="flex flex-col items-center">
          <select className="px-5 py-2 my-5 border rounded-md border-gray-400">
            {Labels.map((label, index) => {
              return (
                <option key={index} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {Labels.map((label, index) => {
            return (
              <Label
                key={index}
                content={label}
                handler={() => {
                  handleLabelClick(index);
                }}
                active={index === selectedLabel}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
