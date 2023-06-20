import React, { useRef, useState, useEffect } from "react";
import Labels from "@mock/labels.json";
import { setInfo } from "@store/infoSlice";
import { useDispatch } from "react-redux";

export default function SetExpenditureWeights() {
  const dispatch = useDispatch();
  const [expenditureWeights, setExpenditureWeights] = useState({
    "Food Expenditure": 0,
    "Restaurant and Hotels Expenditure": 0,
    "Alcoholic Beverages Expenditure": 0,
    "Tobacco Expenditure": 0,
    "Clothing and Other Wear Expenditure": 0,
    "Housing and Water Expenditure": 0,
    "Medical Care Expenditure": 0,
    "Transportation Expenditure": 0,
    "Communication Expenditure": 0,
    "Education and Learning Expenditure": 0,
    "Miscellaneous Expenditure": 0,
    "Special Occasions Expenditure": 0,
    "Gardening Expenditure": 0,
  });

  const [totalWeight, setTotalWeight] = useState(
    Object.values(expenditureWeights).reduce((a, b) => a + b, 0)
  );

  const [currentExpenditure, setCurrentExpenditure] = useState(Labels[0]);
  const weigthRef = useRef(null);
  const expenditureRef = useRef(null);

  useEffect(() => {
    setTotalWeight(
      Object.values(expenditureWeights).reduce((a, b) => a + b, 0)
    );
  }, [expenditureWeights]);

  return (
    <div className="text-slate-500 flex flex-col">
      <p className="flex flex-row">
        <input
          ref={weigthRef}
          className="w-[40%] mr-2 border border-slate-200 rounded-md mb-1 py-0 px-1"
          type="number"
          name="weight"
          value={expenditureWeights[currentExpenditure]}
          onChange={() => {
            const expenditure = expenditureRef.current.value;
            const weight = weigthRef.current.value;
            if (totalWeight >= 100) {
              dispatch(
                setInfo({
                  message: "You cannot exceed 100%",
                  type: "error",
                  show: true,
                })
              );
              return;
            }
            if (totalWeight + Number.parseInt(weight) > 100) {
              dispatch(
                setInfo({
                  message: "You have reached 100%",
                  type: "info",
                  show: true,
                })
              );
            }
            setExpenditureWeights((prev) => {
              return { ...prev, [expenditure]: Number.parseInt(weight) };
            });
          }}
        />
        <span
          className={`${
            totalWeight > 100 ? "bg-red-300" : "bg-green-300"
          } w-fit h-fit rounded-md px-1`}
        >
          {totalWeight}
          {"%"}
        </span>
      </p>
      <select
        onChange={() => {
          setCurrentExpenditure(expenditureRef.current.value);
        }}
        ref={expenditureRef}
        name="expenditure-weights"
        id="expenditure-weights"
        defaultValue={currentExpenditure}
        className="text-sm focus:outline-none border border-slate-200 rounded-md mb-1 py-1 px-2"
      >
        {Labels.map((label, index) => (
          <option type="text" key={index}>
            {label}
            {/* {" -- "} */}
            {/* {expenditureWeights[label]} */}
            {/* {"%"} */}
          </option>
          // <option type="text" key={index}>
          //   {label
          //     .split(" ")
          //     .filter((word) => word != "Expenditure")
          //     .join(" ")}
          // </option>
        ))}
      </select>
      <button
        onClick={() => {
          console.log(expenditureWeights);
        }}
        type="button"
        className="text-sm bg-slate-600 text-white rounded-md py-1 px-2"
      >
        Update
      </button>
    </div>
  );
}
