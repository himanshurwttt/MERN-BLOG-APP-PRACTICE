import React, { useEffect, useState } from "react";
import ContentBox from "../components/ContentBox";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/post/getpost");
      const data = await res.json();
      if (!res.ok) {
        console.log("something went wrong");
      } else {
        console.log(data.post);
        setPosts(data.post);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-screen-xl h-full p-3 m-auto">
      <h1 className="w-full text-center text-4xl font-[500] underline text-stone-800 mb-5">
        ALL POSTS
      </h1>
      <div className="flex flex-wrap p-2 justify-between md:gap-4 gap-1">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <ContentBox key={post.id} post={post} /> // Assuming each post has a unique 'id'
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
