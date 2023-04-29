import React, {useState} from "react";

export default function FloatingButton() {
    const [act, setAct] = useState(false);
  return (
    <div className="fixed bottom-[150px] right-24 mr-10">
      <button onClick={()=>{setAct(!act)}} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
        {"+"}
      </button>
      <div className={`${act ? "absolute bottom-10 right-10" : "hidden relative"} bg-white w-[200px] h-[60px] border border-gray-400 rounded-md flex flex-col justify-center items-stretch px-2`}>
        <div className="text-sm flex flex-row justify-between items-center"><p>Income</p><button className="underline text-xs">Edit</button></div>
        <div className="text-sm flex flex-row justify-between items-center"><p>Expenditure Weights</p><button className="underline text-xs">Edit</button></div>
      </div>
    </div>
  );
}
