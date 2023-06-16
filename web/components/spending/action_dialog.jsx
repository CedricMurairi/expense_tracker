import React, { useState, useRef, use } from "react";
import Labels from "@mock/labels.json";
import SelectElement from "@components/shared/select";
import Pulser from "@components/shared/pulser";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteExpenditureMutation,
  useUpdateExpenditureMutation,
} from "@data/base_api";
import { setInfo } from "@store/infoSlice";
import {
  updateExpenditure as updateAnExpenditure,
  removeExpenditure,
  updateMonthlySpendings,
} from "@store/dataSlice";

export default function ExpenditureActionDialog({
  actionAmount,
  actionCategory,
  actionId,
  setShowActions,
  setActionCategory,
}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.value);
  const [edit, setEdit] = useState(false);
  const categoryRef = useRef(null);
  const amountRef = useRef(null);
  const [deleteExpenditure, { isLoading: deleteIsLoading }] =
    useDeleteExpenditureMutation();
  const [updateExpenditure, { isLoading: updateIsLoading }] =
    useUpdateExpenditureMutation();

  return (
    <div className="flex flex-col px-4 gap-0 border bg-white border-slate-300 absolute justify-center items-center rounded-lg shadow-2xl shadow-slate-400">
      {edit ? (
        <div className="flex justify-center items-center gap-2">
          <input
            className="border border-gray-400 rounded-md px-1 py-1 h-fit w-20 focus:outline-none"
            type="text"
            name="action-amount"
            id="action-amout"
            defaultValue={actionAmount}
            onChange={() => {}}
            ref={amountRef}
          />
          <SelectElement
            reference={categoryRef}
            initialValue={actionCategory}
            fieldName="expenditure-category"
            action={(e) => setActionCategory(e.target.value)}
            width={"w-20"}
          >
            {Labels.map((label, index) => {
              return (
                <option key={index} value={label}>
                  {label}
                </option>
              );
            })}
          </SelectElement>
        </div>
      ) : null}
      <div className={`flex gap-1 ${edit ? "mb-3" : "my-3"}`}>
        {updateIsLoading ? (
          <span className="flex justify-center items-center pr-2">
            <Pulser primary={"bg-slate-300"} secondary={"bg-slate-600"} />
          </span>
        ) : (
          <button
            onClick={() => {
              if (!edit) {
                setEdit(true);
              } else {
                const reqParams = {
                  id: actionId,
                  body: {
                    category: categoryRef.current.value,
                    amount: amountRef.current.value,
                  },
                };
                updateExpenditure(reqParams).then((updatedResult) => {
                  if (updatedResult) {
                    const monthlySpendings =
                      data.monthlySpendings -
                      Number.parseFloat(actionAmount) +
                      Number.parseFloat(updatedResult.data.data.amount);
                    dispatch(updateAnExpenditure(updatedResult.data));
                    setShowActions(false);
                    setEdit(false);
                    dispatch(
                      setInfo({
                        message: "Updated",
                        type: "success",
                        show: true,
                      })
                    );
                  } else {
                    dispatch(
                      setInfo({
                        message: "Failed to update",
                        type: "error",
                        show: true,
                      })
                    );
                  }
                });
              }
            }}
            className="bg-green-100 rounded-md px-1 py-1 border border-gray-400"
          >
            {edit ? "Save" : "Edit"}
          </button>
        )}
        {deleteIsLoading ? (
          <span className="flex justify-center items-center pl-2">
            <Pulser primary={"bg-slate-300"} secondary={"bg-slate-600"} />
          </span>
        ) : (
          <button
            onClick={() => {
              deleteExpenditure(actionId).then((result) => {
                dispatch(removeExpenditure(actionId));
                setShowActions(false);
                dispatch(
                  setInfo({ message: "Deleted", type: "success", show: true })
                );
              });
            }}
            className="h-fit bg-red-50 rounded-md px-1 py-1 border border-gray-400"
          >
            {"Delete"}
          </button>
        )}
      </div>
      <button onClick={() => setShowActions(false)} className="text-sm mb-2">
        Close
      </button>
    </div>
  );
}
