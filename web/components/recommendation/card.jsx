import React, { useState } from "react";

export default function RecommendationCard({ data, header }) {
  const [showMessages, setShowMessages] = useState(false);
  return (
    <div className="flex flex-col bg-red-50 rounded-lg my-3 px-3 py-2">
      <h2 className="text-md font-[500]">{header}</h2>
      {Object.keys(data).map((entry, index) =>
        entry === "messages" ? (
          <div className="list-none" key={index}>
            {showMessages &&
              Object.keys(data.messages).map((innerIndex) => {
                return <li className="text-md font-thin" key={innerIndex}>{data.messages[innerIndex]}</li>;
              })}
          </div>
        ) : (
          <div key={index} className="px-2 py-1">
            {entry.includes("_percent") ? (
              <div className="flex flex-row justify-between items-center">
                <p className="text-xl font-[300]">{entry.split("_")[0]}</p>
                <p
                  className={`${
                    entry.split("_")[0] === "adjustment"
                      ? "text-orange-400"
                      : entry.split("_")[0] === "allocation"
                      ? "text-green-600"
                      : "text-red-600"
                  } text-2xl font-bold`}
                >
                  {data[entry]}
                  {"%"}
                </p>
              </div>
            ) : (
              <div
                key={index}
                className="flex flex-row justify-between items-center"
              >
                <p className="text-xl font-[300]">{entry.split("_")[1]}</p>
                <p
                  className={`${
                    entry.split("_")[1] === "allocate"
                      ? "text-orange-400"
                      : entry.split("_")[1] === "save" ||
                        entry.split("_")[1] === "baseline"
                      ? "text-green-600"
                      : "text-red-600"
                  } text-2xl font-bold`}
                >
                  {"RWF"}
                  {Math.round(data[entry])}
                </p>
              </div>
            )}
          </div>
        )
      )}
      <button
        onClick={() => {
          setShowMessages(!showMessages);
        }}
        className="underline text-xs font-thin"
      >
        {showMessages ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
