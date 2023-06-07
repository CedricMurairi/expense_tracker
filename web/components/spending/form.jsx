import React, { useState, useRef } from "react";
import Labels from "@mock/labels.json";
import Label from "@components/shared/label";
import PaymentTypes from "@mock/payment_type.json";
import PaymentTypeSelector from "@components/shared/payment_type";
import Button from "@components/shared/button";
import useWindowSize from "@hooks/window_size";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "@store/infoSlice";
import {
  updateMonthlySpendings,
  addExpenditure as addAnExpenditure,
} from "@store/dataSlice";
import SelectElement from "@components/shared/select";
import { useAddExpenditureMutation } from "@data/base_api";
import Pulser from "@components/shared/pulser";

export default function Form() {
  const [selectedLabel, setSelectedLabel] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const amountRef = useRef(null);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const data_state = useSelector((state) => state.data);

  const [addExpenditure, { isLoading }] = useAddExpenditureMutation();

  const handleLabelClick = (index) => {
    if (index === selectedLabel) {
      setSelectedLabel(null);
      return;
    }
    setSelectedLabel(index);
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

  const saveExpeditureEntry = async () => {
    if (amountRef.current.value.length === 0 || selectedLabel === 0) {
      dispatch(
        setInfo({
          message: "Amount or label missing",
          type: "error",
          show: true,
        })
      );
      return;
    }

    if (typeof Number.parseFloat(amountRef.current.value) !== "number") {
      dispatch(
        setInfo({
          message: "Amount must be a number",
          type: "error",
          show: true,
        })
      );
      return;
    }

    const data = {
      category: Labels[selectedLabel - 1],
      payment_type: PaymentTypes[selectedPayment],
      amount: amountRef.current.value,
      date: new Date().toString(),
    };

    addExpenditure(data).then((result) => {
      const newAmount = result.data.data.amount;
      const newMonthlySpendings =
        data_state.value.monthlySpendings + Number.parseFloat(newAmount);
      dispatch(
        addAnExpenditure({ data: result.data.data, id: result.data.id })
      );
      dispatch(updateMonthlySpendings(newMonthlySpendings));
      amountRef.current.value = "";
      setSelectedLabel(0);
      dispatch(setInfo({ message: "Recorded", type: "success", show: true }));
    });
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
            ref={amountRef}
            className="max-sm:px-3 px-5 py-2 my-5 border rounded-md border-gray-400 focus:outline-none"
            type="text"
            datatype="number"
            inputMode="numeric"
            accept="number"
            placeholder="Amount"
          />
          <span className="max-sm:text-lg ml-2 text-2xl">RWF</span>
        </div>
        <Button
          action={saveExpeditureEntry}
          content={
            isLoading ? (
              <Pulser primary={"bg-gray-300"} secondary={"bg-white"} />
            ) : (
              "Record"
            )
          }
        />
      </form>
      {size.width < 1100 ? (
        <div className="flex flex-col items-center">
          <SelectElement
            fieldName="Expenditure"
            initialValue={selectedLabel}
            action={updateSelectEvent}
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
          </SelectElement>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 w-[70%] m-auto">
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
