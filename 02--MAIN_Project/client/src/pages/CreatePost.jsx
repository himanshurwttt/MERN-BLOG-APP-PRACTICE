import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Button, FileInput, Select, TextInput } from "flowbite-react";
export const CreatePost = () => {
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
          <FileInput type="file" accept="image/*" />
          <Button gradientDuoTone={"purpleToPink"} size={"sm"} outline>
            Upload Image
          </Button>
        </div>
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
