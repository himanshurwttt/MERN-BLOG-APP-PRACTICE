import React, { useEffect, useInsertionEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { BiTimeFive } from "react-icons/bi";
import { useSelector } from "react-redux";
import moment from "moment";
export default function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [commentUser, setCommentUser] = useState("");

  const fetchCommentUsers = async () => {
    try {
      const res = await fetch(`/api/comment/getCommentUser/${comment.userId}`);
      const data = await res.json();
      if (res.ok) {
        setCommentUser(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommentUsers();
  }, [comment.userId]);

  return (
    <div className="bg-blue-50 shadow-slate-400 shadow-md outline-1 outline-blue-200  m-auto my-4 p-3 rounded-md md:max-w-md md:mx-auto w-full max-w-md ">
      <div className=" mb-2  w-full flex flex-row justify-between items-center">
        <div className="flex  items-center gap-1">
          <img
            src={commentUser.profilePicture}
            alt={commentUser.username}
            className="bg-cover w-8 h-8 rounded-full border-[2px] border-zinc-500 "
          />
          <label className="text-xs italic text-zinc-700">
            {commentUser
              ? `@${commentUser.username.toLowerCase()}`
              : "@abcd1234"}
          </label>
        </div>
        <div className="ago text-xs flex flex-row justify-center items-center gap-1">
          <BiTimeFive className="scale-[1.2] text-zinc-700" />
          {moment(comment.createdAt).fromNow()}
        </div>
      </div>
      <hr />
      <div className="content text-xs text-zinc-600 font-[500] my-4 selection:bg-none">
        {comment.content}
      </div>
      <div className=" py-2 flex justify-between">
        <div className="flex gap-2 ">
          {currentUser && (
            <FaRegHeart className=" cursor-pointer active:scale-[0.95] scale-[1.1] duration-100 " />
          )}
          <p className="text-xs font-[500] text-zinc-700 selection:bg-none">
            {comment.noOfLikes}
          </p>
        </div>
        <div className="flex gap-2  ">
          {currentUser._id === comment.userId && (
            <IoMdCreate className=" cursor-pointer active:scale-[0.95] scale-[1.1] duration-100 " />
          )}
          {(currentUser._id === comment.userId || currentUser.isAdmin) && (
            <MdDelete className=" cursor-pointer active:scale-[0.95] scale-[1.1] duration-100" />
          )}
        </div>
      </div>
    </div>
  );
}
