import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function ContentBox() {
  return (
    <div className="bg-blue-300 mt-2 md:w-72 w-[48%] h-80 rounded-xl p-2 flex flex-col gap-1 justify-between overflow-hidden   shadow-slate-400 hover:drop-shadow-lg hover:shadow-slate-400 duration-300 shadow-sm m-auto">
      <div className="img w-full h-40 bg-red-700 rounded-lg   overflow-hidden">
        <div className="img w-full h-40 bg-red-700 rounded-lg shadow-xl hover:scale-[1.1] duration-200">
          xx
        </div>
      </div>
      <div className="head capitalize w-full   h-12 font-[500] overflow-hidden text-ellipsis hover:underline cursor-pointer duration-300 ">
        this is the headline and this is what i'm talking about sdfasdf
      </div>
      <div className="btn w-full  h-10">
        <button className="flex flex-row items-center bg-blue-900 text-white w-full justify-center drop-shadow-xl gap-2 hover:gap-5 duration-200 font-[500] p-2 rounded-es-lg rounded-ee-lg">
          Read <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}
