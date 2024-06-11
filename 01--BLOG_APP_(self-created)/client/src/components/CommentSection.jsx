import React, { useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  console.log("postId:", postId);
  console.log("userId:", currentUser._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length == 0) {
      setFormError("comment should not be empty");
    }
    try {
      const res = await fetch(`/api/comment/create/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setFormError("Unable to post , please Try again");
      }
      if (res.ok) {
        setComment("");
        setFormError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-80 max-w-lg m-auto">
      <h1 className="text-center text-5xl uppercase font-[500] text-zinc-800 mb-10">
        Comments
      </h1>
      <div className="flex flex-col  w-full items-end justify-center mt-5">
        <form
          onSubmit={handleSubmit}
          className="w-full px-16 flex flex-col  gap-2 "
        >
          <textarea
            type="text"
            maxLength="300"
            className="m-auto w-full h-28  text-zinc-600 font-[500] p-3 italic  focus:outline-none text-xs rounded-md resize-none hover:shadow-2xl duration-200 hover:shadow-blue-300 shadow-lg"
            placeholder="Write a comment here.."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
          />

          <div className="flex flex-row justify-between items-center">
            <p className="text-xs text-zinc-600 italic font-[400]">
              Character Remaning: {300 - comment.length}
            </p>
            <button
              onClick={handleSubmit}
              className="hover:bg-green-400 duration-200   self-end shadow-lg border-green-300 bg-green-200 w-20 h-9 text-sm font-[500] rounded-md scale-[1] active:scale-[0.90]"
            >
              Submit
            </button>
          </div>
          {formError && (
            <p className="text-xs text-red-600 italic font-[400] bg-red-200 p-1 rounded-md w-full">
              {formError}
            </p>
          )}
        </form>
      </div>
      <Comment />
    </div>
  );
}
