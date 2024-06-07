import React from "react";
import ContentBox from "../components/ContentBox";

export default function AllPosts() {
  return (
    <div className="w-full max-w-screen-xl h-full  p-3 m-auto ">
      <h1 className="w-full text-center text-4xl font-[500] underline  text-stone-800 mb-5">
        ALL POSTS
      </h1>
      <div className=" flex flex-wrap p-2 justify-between md:gap-4 gap-1 ">
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
        <ContentBox />
      </div>
    </div>
  );
}
