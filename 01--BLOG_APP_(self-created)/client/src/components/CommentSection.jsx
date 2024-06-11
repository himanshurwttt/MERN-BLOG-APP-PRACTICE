import React from "react";

export default function CommentSection() {
  return (
    <div className=" h-80 max-w-lg m-auto">
      <h1 className="text-center text-5xl uppercase font-[500] text-zinc-800">
        Comments
      </h1>
      <div className="flex flex-col  w-full items-end justify-center mt-5">
        <form className="w-full px-16 flex flex-col  gap-2 ">
          <textarea
            type="text"
            maxLength="300"
            className="m-auto w-full h-28  text-zinc-600 font-[500] p-3 italic  focus:outline-none text-xs rounded-md resize-none shadow-lg"
            placeholder="Write a comment here.."
          />
          <button className="m-auto  bg-green-300 w-20 h-9 text-sm font-[500] rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
