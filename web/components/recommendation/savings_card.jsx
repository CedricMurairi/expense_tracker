import React, { useState } from "react";

export default function SavingsRecommendationCard({ data }) {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <div className="flex flex-col bg-red-50 rounded-lg my-3 px-3 py-2">
      {Object.keys(data).map((entry, index) =>
        entry === "messages" ? (
          <div className="list-none" key={index}>
            {showMessages &&
              Object.keys(data.messages).map((innerIndex) => {
                console.log("This is the saving recommendation card", data);
                return (
                  <li className="text-md font-thin" key={innerIndex}>
                    {data.messages[innerIndex]}
                  </li>
                );
              })}
          </div>
        ) : (
          <div key={index} className="px-2 py-1">
            {entry.includes("_percent") ? (
              <div className="flex flex-row justify-between items-center">
                <p className="text-xl font-[300]">{entry.split("_")[0]}</p>
                <p
                  className={`${entry.includes("_increase")
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
                <p className="text-xl font-[300]">{entry}</p>
                <p
                  className={`${entry.includes("_increase")
                    ? "text-green-600"
                    : "text-orange-400"
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
