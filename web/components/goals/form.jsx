import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Labels from "@mock/labels.json";
// import Label from "@components/shared/label";
// import PaymentTypes from "@mock/payment_type.json";
// import PaymentTypeSelector from "@components/shared/payment_type";
import Button from "@components/shared/button";

export default function Form() {
//   const [selectedLabel, setSelectedLabel] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   const handleLabelClick = (index) => {
//     setSelectedLabel(index);
//   };

//   const handlePaymentTypeClick = (index) => {
//     setSelectedPayment(index);
//   };
  return (
    <div>
      <form className="flex flex-col justify-center items-center mb-10">
        <input
          className="px-5 py-2 border mb-1 mt-5 rounded-md border-gray-400"
          type="text"
          placeholder="Saving Motif"
        />
        <div className="w-fit flex flex-row items-center justify-center">
          <input
            className="px-5 py-2 mt-1 mb-5 border rounded-md border-gray-400"
            type="text"
            placeholder="Amount"
          />
        </div>
        <Button content={"Record"} />
      </form>
    </div>
  );
}
