import React from "react";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
export default function DashContentBox({ post }) {
  return (
    <div className=" max-w-lg flex flex-row bg-blue-50  drop-shadow-lg rounded-lg overflow-hidden  mx-2 md:mx-0 my-2">
      <div className="w-2/5 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6   flex flex-col flex-wrap ">
        <div className="mb-2  w-full text-blue-gray-700 text-2xl text-ellipsis font-bold head capitalize h-24  overflow-hidden   cursor-pointer duration-300">
          {post.title}
        </div>
        <div className="mb-4 max-w-64   text-gray-500 overflow-hidden  h-20 p-1">
          {ReactHtmlParser(post.content)}
        </div>
        <div className="flex w-full justify-between text-sm">
          <Link to={`/posts/${post.slug}`}>
            <button className="flex items-center gap-2 text-blue-800 hover:underline">
              Read
              <FaArrowRight />
            </button>
          </Link>
          <Link to={`/updatepost/${post._id}`}>
            <button className="flex items-center gap-2 text-blue-800 hover:underline">
              Update
              <IoCreate />
            </button>
          </Link>
          <button className="flex items-center gap-2 text-blue-800 hover:underline">
            Delete
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
