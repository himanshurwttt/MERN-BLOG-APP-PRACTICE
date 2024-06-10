import React, { useState } from "react";

const Modal = ({ isOpen, closeModal, postId, refetchPosts }) => {
  const [deletePostError, setDeletePostError] = useState(null);
  const deletePost = async () => {
    if (!postId) {
      setDeletePostError("can't able to delete post now");
    }
    const res = await fetch(`/api/post/deletepost/${postId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      setDeletePostError(data.message);
    } else {
      closeModal();
      refetchPosts();
    }
  };

  return isOpen ? (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-4 p-2 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-blue-100 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
      >
        <div className="flex items-center text-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
          DELETE POST
        </div>
        <div className="relative p-4 font-sans text-base antialiased font-[500] leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
          Are You Sure you want to Delte this post??
        </div>
        <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
          <button
            onClick={closeModal}
            className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={deletePost}
            className="middle none center rounded-lg bg-gradient-to-tr from-red-700 to-red-500 py-3 px-6  text-xs font-[500] uppercase text-white  shadow-green-500/20 transition-all hover:shadow-lg shadow-lg hover:shadow-red-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  "
          >
            Delete
          </button>
        </div>
        {deletePostError && (
          <div className="w-full bg-red-200  drop-shadow-lg text-xs text-red-900 font-[400] p-2 rounded-md ">
            <p>Something Went Wrong , Try Again</p>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
