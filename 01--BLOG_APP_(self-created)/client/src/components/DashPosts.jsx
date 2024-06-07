import React from "react";
import ContentBox from "./ContentBox";

export default function DashPosts() {
  return (
    <div className="w-full max-w-screen-xl h-full  ">
      <div className=" flex flex-wrap justify-center   md:gap-4 gap-1 ">
        <ContentBox />
        <ContentBox />
        <ContentBox />
      </div>
    </div>
  );
}
