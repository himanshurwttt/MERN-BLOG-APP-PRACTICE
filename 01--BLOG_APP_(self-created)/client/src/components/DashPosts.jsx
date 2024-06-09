import React, { useEffect, useState } from "react";
import ContentBox from "./ContentBox";
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
        console.log(data.post.slug);
        setPosts(data.post);
        setFetchProcess(false);
      }
    } catch (error) {
      setFetchProcess(false);
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full max-w-screen-xl h-[90vh] overflow-hidden z-10 ">
      <div className=" flex flex-wrap w-full justify-around h-full overflow-y-auto ">
        {fetchProcess ? (
          <LoadingSpinner />
        ) : (
          posts.map((post) => <DashContentBox post={post} key={post._id} />)
        )}
      </div>
    </div>
  );
}
