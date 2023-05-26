import React from "react";
import { useDispatch } from "react-redux";
import { clearInfo } from "@store/infoSlice";

export default function Info({ data }) {
  const dispatch = useDispatch();
  return (
    <>
      {data.show ? (
        <div className="absolute top-10 flex flex-row gap-3 justify-center items-center bg-gray-100 py-1 px-4 rounded-lg">
          <p
            className={`${
              data.type == "info"
                ? "text-yellow-600"
                : data.type == "success"
                ? "text-green-600"
                : data.type == "error"
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {data.message}
          </p>
          <button
            onClick={() => dispatch(clearInfo())}
            className="underline text-gray-500"
          >
            close
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
