import React, { useEffect, useState } from "react";
import ContentBox from "../components/ContentBox";
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
      <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 Acme Blog. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <p
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </p>
          <p
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </p>
        </nav>
      </footer>
    </div>
  );
}
