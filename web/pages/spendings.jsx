import React, { useEffect } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/spending/form";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlySpendings } from "@helpers/data";
import { setData } from "@store/dataSlice";
import {
  useGetExpendituresQuery,
  useGetDataAndSettingsQuery,
} from "@data/base_api";
import Pulser from "@components/shared/pulser";
import formatNumber from "@helpers/format_number";

export default function Spendings() {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.data.value);
  const { data, isLoading, refetch } = useGetExpendituresQuery();
  const { data: settingsData, isLoading: settingsIsLoading } =
    useGetDataAndSettingsQuery();

  useEffect(() => {
    if (data) {
      const monthlySpendings = getMonthlySpendings(data.expenditures);
      dispatch(setData({ expenditures: data.expenditures, monthlySpendings }));
    }
  }, [data]);

  useEffect(() => {
    if (settingsData) {
      dispatch(setData({ settings: settingsData }));
    }
  }, [settingsData]);

  return (
    <MainLayout headerContent="Spendings" page="Home">
      <div className="w-full">
        <div className="max-sm:text-[15px] max-sm:mb-3 text-xl flex flex-row justify-center items-center mb-5 font-bold">
          {settingsIsLoading ? (
            <span className="px-5">
              <Pulser primary={"bg-slate-300"} secondary={"bg-slate-600"} />
            </span>
          ) : (
            <p className=" bold py-1 text-green-500">
              In: {formatNumber(stateData?.settings?.income?.amount)}{" "}
              {stateData?.settings?.income?.currency}
            </p>
          )}
          <span className="mx-2 text-gray-500">{"|"}</span>
          {isLoading ? (
            <span className="px-5">
              <Pulser primary={"bg-slate-300"} secondary={"bg-slate-600"} />
            </span>
          ) : (
            <p className=" bold py-1 text-orange-500">
              Out: {formatNumber(stateData?.monthlySpendings)}{" "}
              {stateData?.settings?.income?.currency}
            </p>
          )}
        </div>
        <Form />
      </div>
    </MainLayout>
  );
}
