import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleHeadingChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        const storageRef = ref(storage, `posts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progess =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progess);
          },
          (error) => {
            console.error("Upload error :", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                resolve(url);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      } else {
        resolve(currentUser.profilePicture);
      }
    });
  };

  return (
    <div className="w-full h-screen p-10">
      <div className="max-w-3xl m-auto p-5 bg-blue-300 drop-shadow-xl rounded-md h-full overflow-hidden">
        <h1 className="font-[500] text-4xl underline text-center ">
          CREATE POST
        </h1>
        <form className="max-w-2xl m-auto flex flex-col items-center gap-4">
          <div className="heading  w-full my-3">
            <input
              type="text"
              placeholder="BLOG TITLE HERE"
              className="p-1 rounded-md w-full text-center drop-shadow-lg"
              onChange={handleHeadingChange}
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center ">
            <label>Select Image :</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="bg-white p-1 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-full overflow-hidden h-80 rounded-xl ">
            <ReactQuill
              onChange={handleContentChange}
              theme="snow"
              className="h-[85%] drop-shadow-lg bg-white"
            />
          </div>
          <div className="w-full">
            <button className="bg-blue-900 text-white drop-shadow-md p-1 rounded-md w-full ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
