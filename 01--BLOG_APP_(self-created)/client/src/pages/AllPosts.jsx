import React, { useEffect, useState } from "react";
import ContentBox from "../components/ContentBox";
import { FaLessThanEqual } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AllPosts() {
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
    <div className="w-full max-w-screen-xl h-full min-h-screen p-3 m-auto">
      <h1 className="w-full text-center text-4xl font-[500] underline text-stone-800 mb-5">
        ALL POSTS
      </h1>
      {fetchProcess ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-wrap start p-2 justify-end md:gap-4 gap-1">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <ContentBox key={post.id} post={post} /> // Assuming each post has a unique 'id'
            ))
          ) : fetchError ? (
            fetchError
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  );
}
