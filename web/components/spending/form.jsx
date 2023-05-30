import React, { useState } from "react";
import Labels from "@mock/labels.json";
import Label from "@components/shared/label";
import PaymentTypes from "@mock/payment_type.json";
import PaymentTypeSelector from "@components/shared/payment_type";
import Button from "@components/shared/button";
import useWindowSize from "@hooks/window_size";
import { useDispatch } from "react-redux";
import { setInfo } from "@store/infoSlice";
import saveExpenditure from "@data/save_expenditure";
import getFirebaseClientIdToken from "helpers/get_id_token";

export default function Form() {
  const [selectedLabel, setSelectedLabel] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState(0);
  const size = useWindowSize();
  const dispatch = useDispatch();

  const handleLabelClick = (index) => {
    if (index === selectedLabel) {
      setSelectedLabel(null);
      return;
    }
    setSelectedLabel(index);
    console.log(typeof index);
  };

  const updateSelectEvent = (e) => {
    setSelectedLabel(Number.parseInt(e.target.value));
  };

  const handlePaymentTypeClick = (index) => {
    if (index === selectedPayment) {
      setSelectedPayment(null);
      return;
    }
    setSelectedPayment(index);
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  const saveExpeditureEntry = async () => {
    if (amount === 0 || selectedLabel === 0) {
      dispatch(
        setInfo({
          message: "Amount or label missing",
          type: "error",
          show: true,
        })
      );
      return;
    }

    const idToken = await getFirebaseClientIdToken();

    const data = {
      label: selectedLabel,
      payment: selectedPayment,
      amount: amount,
    };
    const result = await saveExpenditure(data, idToken);
    console.log(result);
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
            onChange={updateAmount}
            className="max-sm:px-3 px-5 py-2 my-5 border rounded-md border-gray-400 focus:outline-none"
            type="text"
            placeholder="Amount"
          />
          <span className="max-sm:text-lg ml-2 text-2xl">RWF</span>
        </div>
        <Button action={saveExpeditureEntry} content={"Record"} />
      </form>
      {size.width < 1100 ? (
        <div className="flex flex-col items-center">
          <select
            defaultValue={selectedLabel}
            onChange={updateSelectEvent}
            className="px-5 py-2 my-5 border rounded-md border-gray-400"
          >
            <option disabled value={0}>
              {" "}
              -- select an option --{" "}
            </option>
            {Labels.map((label, index) => {
              return (
                <option key={index} value={index + 1}>
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
                  handleLabelClick(index + 1);
                }}
                active={index + 1 === selectedLabel}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
