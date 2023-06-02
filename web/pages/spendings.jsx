import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import Form from "@components/spending/form";
import { useDispatch, useSelector } from "react-redux";
import getData from "@helpers/get_data";
import { listenForData } from "@helpers/get_data";

export default function Spendings() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    getData(dispatch);
    return listenForData(dispatch);
  }, []);

  return (
    <MainLayout headerContent="Spendings" page="Home">
      <div className="w-full">
        <div className="max-sm:text-[15px] max-sm:mb-3 text-xl flex flex-row justify-center items-center mb-5 font-bold">
          <p className=" bold py-1 text-green-500">
            In: {data.value?.income} RWF
          </p>
          <span className="mx-2 text-gray-500">{"|"}</span>
          <p className=" bold py-1 text-orange-500">
            Out: {data.value?.monthlySpendings} RWF
          </p>
        </div>
        <Form />
      </div>
    </MainLayout>
  );
}
