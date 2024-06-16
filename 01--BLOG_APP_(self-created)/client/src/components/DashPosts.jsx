import React, { useEffect, useState } from "react";
import DashContentBox from "./DashContentBox";
import LoadingSpinner from "./LoadingSpinner";

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [fetchProcess, setFetchProcess] = useState(false);

  const fetchData = async () => {
    setFetchProcess(true);
    try {
      const res = await fetch("/api/post/getpost");
      const data = await res.json();
      if (!res.ok) {
        console.log("something went wrong");
        setFetchError(
          "Something went wrong please try again or 'Referesh the page'"
        );
        setFetchProcess(false);
      } else {
        // console.log(data.post.slug);
        setPosts(data.post);
        setFetchProcess(false);
      }
    } catch (error) {
      setFetchProcess(false);
      console.log("An error occurred:", error);
    }
  };

  const refetchPosts = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full max-w-screen-xl h-[90vh] overflow-hidden z-10 p-6">
      <div className=" flex flex-wrap w-full justify-around h-full overflow-y-auto custom-scrollbar ">
        {fetchProcess
          ? <LoadingSpinner /> || (
              <h1 className="font-[500]"> No Post Available</h1>
            )
          : posts.map((post) => (
              <DashContentBox
                post={post}
                key={post._id}
                refetchPosts={refetchPosts}
              />
            ))}
      </div>
    </div>
  );
}
