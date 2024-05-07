import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { app } from "../firebase";

export const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadProgressError, setImageUploadProgressError] =
    useState(null);
  const [formdata, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadProgressError("Please select a file to upload");
        return;
      }

      setImageUploadProgressError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      });

      (error) => {
        setImageUploadProgressError('image upload failed "please try again"');
      };

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadProgressError(null);
          setFormData({ ...formdata, image: downloadURL });
        });
      };
    } catch (error) {
      setImageUploadProgress(null);
      setImageUploadProgressError("Image upload failed");
    }
  };
  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto">
      <h1 className="my-7 font-bold text-4xl text-center">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Headline"
            id="title"
            required
            className="flex-1"
          />
          <Select>
            <option value={"uncategorized"}>Select a category</option>
            <option value={"categorized"}>javascript</option>
            <option value={"categorized"}>python</option>
            <option value={"categorized"}>react js</option>
            <option value={"categorized"}>next js</option>
            <option value={"categorized"}>c</option>
            <option value={"categorized"}>c++</option>
            <option value={"categorized"}>ruby</option>
            <option value={"categorized"}>html</option>
            <option value={"categorized"}>css</option>
          </Select>
        </div>
        <div className="flex flex-col items-center gap-4 border-teal-600 border-dotted border-4 p-3 sm:flex-row  justify-between">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
          <Button
            gradientDuoTone={"purpleToPink"}
            size={"sm"}
            outline
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </div>
        {imageUploadProgressError && (
          <Alert>
            <span>{imageUploadProgressError}</span>{" "}
          </Alert>
        )}
        {formdata.image && (
          <img
            src={formdata.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="write something"
          className="h-64 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          {" "}
          submit
        </Button>
      </form>
    </div>
  );
};
