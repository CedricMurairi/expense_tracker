import React, { useState, useRef } from "react";
import Button from "@components/shared/button";
import { useDispatch } from "react-redux";
import { setInfo } from "@store/infoSlice";
import { useSetGoalMutation } from "@data/base_api";
import Pulser from "@components/shared/pulser";

export default function Form() {
  const motifRef = useRef();
  const amountRef = useRef();
  const installmentRef = useRef();
  const dispatch = useDispatch();

  const [setGoal, { isLoading }] = useSetGoalMutation();

  const [isPayingInstallments, setIsPayingInstallments] = useState(false);

  function generatePayments(installmentCount) {
    const payments = [];

    for (let i = 0; i < installmentCount; i++) {
      const installment = {
        installmentNumber: i,
        amountPaid: amountRef.current.value / installmentCount,
        paymentDate: null,
        paymentDue: new Date().getMonth() + i,
        paid: false,
      };
      payments.push(installment);
    }

    return payments;
  }

  const addGoal = () => {
    let body = {};
    if (isPayingInstallments) {
      body = {
        motif: motifRef.current.value,
        amount: amountRef.current.value,
        installments: isPayingInstallments,
        installments_count: installmentRef.current.value,
        payments: generatePayments(installmentRef.current.value),
        set: new Date().toString(),
        paymentDate: null,
        paid: false
      }
    } else {
      body = {
        motif: motifRef.current.value,
        amount: amountRef.current.value,
        set: new Date().toString(),
        paid: false,
        paymentDate: null,
      }
    }

    setGoal(body).then((result) => {
      dispatch(setInfo({
        message: "Goal recorded",
        type: "success",
        show: true,
      }))

      motifRef.current.value = "";
      amountRef.current.value = "";
      installmentRef.current.value = "";
      setIsPayingInstallments(false);
    });
  }

  return (
    <div>
      <form className="flex flex-col justify-center items-center mb-10">
        <input
          ref={motifRef}
          className="outline-none px-5 py-2 border mb-1 mt-5 rounded-md border-gray-400"
          type="text"
          placeholder="Saving Motif"
        />
        <input
          ref={amountRef}
          className="outline-none w-fit px-5 py-2 mt-1 mb-2 border rounded-md border-gray-400"
          type="text"
          placeholder="Amount"
        />
        <div className="flex justify-center items-center gap-2">
          <label className={`${!isPayingInstallments ? "text-gray-400" : "text-gray-700"}`} htmlFor="toggle-switch">Pay in installments</label>
          <input type="checkbox" name="toggle-switch" id="toggle-switch" defaultValue={isPayingInstallments} onClick={() => setIsPayingInstallments(!isPayingInstallments)} />
        </div>
        <input
          disabled={!isPayingInstallments}
          ref={installmentRef}
          className="outline-none w-fit px-5 py-2 mt-1 mb-5 border rounded-md border-gray-400"
          type="text"
          placeholder="How many?"
        />
        <Button content={!isLoading ? "Record" : <Pulser primary={"bg-gray-300"} secondary={"bg-white"} />} action={() => addGoal()} />
      </form>
    </div>
  );
}
