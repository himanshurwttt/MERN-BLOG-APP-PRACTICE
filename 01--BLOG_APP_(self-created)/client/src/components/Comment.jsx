import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { BiTimeFive } from "react-icons/bi";

export default function Comment() {
  return (
    <div className="bg-blue-50 shadow-slate-400 shadow-md outline-1 outline-blue-200  m-auto my-8 p-3 rounded-md md:max-w-md md:mx-auto w-full max-w-md ">
      <div className=" mb-2 w-full flex flex-row justify-between items-center">
        <div className="flex items-center gap-1">
          <img src="" alt="" className="bg-blue-300 w-7 h-7 rounded-full " />{" "}
          <label className="text-sm italic text-zinc-700">@username</label>
        </div>
        <div className="ago text-xs flex flex-row justify-center items-center gap-1">
          <BiTimeFive className="scale-[1.2] text-zinc-700" /> 3 days ago
        </div>
      </div>
      <hr />
      <div className="content text-xs text-zinc-600 font-[500] my-4 selection:bg-none">
        is there something that i can tell you but i wanna know if i can tell
        you or not bcz i think ican but my mind says i can't what's this
        difficulties even i don't know what is going on with me is this the end
        saiyan goku are you really finished or now vegita will continue your
        legacy btw i like vegita
      </div>
      <div className=" p-2 flex justify-between">
        <div className="flex gap-2 ">
          <FaRegHeart className=" cursor-pointer active:scale-[0.95] scale-[1.1] duration-100 " />
          <IoMdCreate className=" cursor-pointer active:scale-[0.95] scale-[1.1] duration-100 " />
        </div>
        <div className="text-xs text-zinc-700 selection:bg-none">
          {" "}
          Likes: 200
        </div>
      </div>
    </div>
  );
}
