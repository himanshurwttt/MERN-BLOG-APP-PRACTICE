import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PostPage() {
  const { slug } = useParams();
  const [fetchError, setFetchError] = useState(null);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/post/getpost?slug=${slug}`);
          const data = await res.json();

          if (!res.ok) {
            setFetchError("something went wrong please try again");
          } else {
            setFetchError(null);
            setPostData(data.post[0]);
          }
        } catch (error) {
          console.error(error);
        }
      };
      if (slug) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  return (
    <div className="w-full m-auto  h-full p-3">
      {postData ? (
        <div className="max-w-6xl  m-auto ">
          <h1 className="text-6xl text-center font-[500] my-5 font-serif  max-w-4xl m-auto ">
            {postData.title}
          </h1>
          <div className="img  max-w-4xl h-64 md:min-h-[500px] rounded-xl overflow-hidden m-auto shadow-xl">
            <img
              src={postData.image}
              alt={postData.title}
              className="object-cover w-full h-full rou"
            />
          </div>
          <div className="content  text-wrap overflow-x-scroll  sm:max-w-5xl max-w-full m-auto prose prose-lg my-20 mx-3">
            {ReactHtmlParser(postData.content)}
          </div>
          <CommentSection />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      {fetchError && <p>{fetchError}</p>}
    </div>
  );
}
