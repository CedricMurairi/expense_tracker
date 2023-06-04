import React, { useEffect } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/spending/form";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlySpendings } from "@helpers/data";
import { setData } from "@store/dataSlice";
import { useGetExpendituresQuery } from "@data/base_api";
import Pulser from "@components/shared/pulser";

export default function Spendings() {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.data);
  const user = useSelector((state) => state.user.value);
  const { data, currentData, isLoading, isError } = useGetExpendituresQuery();

  useEffect(() => {
    if (data) {
      const monthlySpendings = getMonthlySpendings(data.expenditures);
      dispatch(setData({ expenditures: data.expenditures, monthlySpendings }));
    }
  }, [data]);

  return (
    <MainLayout headerContent="Spendings" page="Home">
      <div className="w-full">
        <div className="max-sm:text-[15px] max-sm:mb-3 text-xl flex flex-row justify-center items-center mb-5 font-bold">
          <p className=" bold py-1 text-green-500">
            In: {stateData.value?.income} RWF
          </p>
          <span className="mx-2 text-gray-500">{"|"}</span>
          {isLoading ? (
            <span className="px-5">
              <Pulser primary={"bg-slate-500"} secondary={"bg-slate-400"}/>
            </span>
          ) : (
            <p className=" bold py-1 text-orange-500">
              Out: {stateData.value?.monthlySpendings} RWF
            </p>
          )}
        </div>
        <Form/>
      </div>
    </MainLayout>
  );
}
