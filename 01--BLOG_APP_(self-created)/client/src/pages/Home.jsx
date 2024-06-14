import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "Dive deep into the world of React Hooks and learn how to leverage them to build powerful and efficient web applications.",
    image: "/placeholder.svg",
    date: "2023-06-01",
  },
  {
    title: "Optimizing Web Performance: Strategies and Techniques",
    excerpt:
      "Discover effective strategies and techniques to optimize the performance of your web applications, ensuring a seamless user experience.",
    image: "/placeholder.svg",
    date: "2023-05-15",
  },
  {
    title: "Exploring the Latest CSS Features for Modern Web Design",
    excerpt:
      "Stay ahead of the curve and learn about the newest CSS features that can elevate your web designs to the next level.",
    image: "/placeholder.svg",
    date: "2023-04-30",
  },
  {
    title:
      "Building Scalable and Maintainable Web Applications with TypeScript",
    excerpt:
      "Dive into the world of TypeScript and learn how it can help you build more robust, scalable, and maintainable web applications.",
    image: "/placeholder.svg",
    date: "2023-04-15",
  },
  {
    title: "Mastering Server-Side Rendering with Next.js",
    excerpt:
      "Explore the power of Next.js and learn how to leverage server-side rendering to create lightning-fast and SEO-friendly web applications.",
    image: "/placeholder.svg",
    date: "2023-03-31",
  },
  {
    title: "Unleashing the Power of Headless CMS for Web Development",
    excerpt:
      "Discover the benefits of using a headless CMS and how it can streamline your web development workflow and deliver exceptional user experiences.",
    image: "/placeholder.svg",
    date: "2023-03-15",
  },
].sort((a, b) => new Date(b.date) - new Date(a.date));

export default function Home() {
  // const [posts, setPosts] = useState([]);
  // const [fetchError, setFetchError] = useState(null);
  // const [fetchProcess, setFetchProcess] = useState(false);

  // const fetchData = async () => {
  //   setFetchProcess(true);
  //   try {
  //     const res = await fetch("/api/post/getpost");
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log("something went wrong");
  //       setFetchError(
  //         "Something went wrong please try again or 'Referesh the page'"
  //       );
  //       setFetchProcess(false);
  //     } else {
  //       console.log(data.post.slug);
  //       setPosts(data.post);
  //       setFetchProcess(false);
  //     }
  //   } catch (error) {
  //     setFetchProcess(false);
  //     console.log("An error occurred:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 m-auto">
        <section className="w-full py-12 md:py-24 lg:py-8 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Web Development Potential
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Dive into the latest web development trends, techniques, and
                    insights with our expert-curated blog.
                  </p>
                </div>
                <Link
                  to={"/posts"}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Read the Blogs
                </Link>
              </div>
              <img
                src="https://plus.unsplash.com/premium_photo-1678566154673-a728037f3f00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Latest from the Blog
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Stay up-to-date with the latest web development trends, best
                  practices, and industry insights.
                </p>
              </div>
            </div>
            {/* <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div key={index} className="border-0 rounded-none shadow-none">
                  <div className="p-0">
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={225}
                      alt={post.title}
                      className="object-cover aspect-video"
                    />
                  </div>
                  <div className="grid gap-2 p-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 Acme Blog. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
