/**
 * v0 by Vercel.
 * @see https://v0.dev/t/btXXl5HyKuA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
// import { button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Component() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="w-full  py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6 md:space-y-8 lg:space-y-10">
            <div className="flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8">
              <div className="relative">
                <div className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 ring-4 flex justify-between items-center shadow-lg dark:shadow-gray-700 rounded-full">
                  <img
                    alt="@"
                    src={currentUser.profilePicture}
                    className="rounded-full w-full "
                  />
                  {/* <AvatarFallback>JP</AvatarFallback> */}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 md:p-2 lg:p-3 shadow-lg ">
                  <CameraIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-black" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Jared Palmer
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                  @{currentUser.username}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                  email: {currentUser.email}
                </p>
              </div>
            </div>
            <button
              className="px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 text-base md:text-lg bg-blue-900 text-white rounded-lg active:scale-[0.9] duration-[0.09s] lg:text-xl shadow-lg dark:shadow-gray-700"
              variant="outline"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          <div className="col-span-1 w-full space-y-4 md:space-y-6 lg:space-y-8">
            <div className="space-y-4 md:space-y-6 lg:space-y-8 rounded-md  bg-blue-800  text-white border-gray-200 p-4  shadow-lg">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Bio
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                I'm a software engineer and designer. I love building beautiful
                and functional products.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6 lg:space-y-8 rounded-md   p-4 bg-blue-900 text-white shadow-lg dark:shadow-gray-700">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Website
              </h2>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-base md:text-lg lg:text-xl"
                href="#"
              >
                jaredpalmer.com
              </Link>
            </div>
            <div className="space-y-4 md:space-y-6 lg:space-y-8 rounded-md bg-blue-900  text-white  border-gray-200 p-4 dark:border-gray-800 shadow-lg dark:shadow-gray-700">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Contact
              </h2>
              <div className="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5">
                  <MailIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                    jared@example.com
                  </span>
                </div>
                <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5">
                  <PhoneIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                    +1 (555) 555-5555
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
            <div className="space-y-4 md:space-y-6 lg:space-y-8 rounded-md bg-blue-900   text-white border-gray-200 p-4 dark:border-gray-800 shadow-lg dark:shadow-gray-700">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                About Me
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                I'm a software engineer and designer with a passion for building
                beautiful and functional products. I've been working in the tech
                industry for over 5 years, and I've had the opportunity to work
                on a variety of projects, from small startups to large
                enterprises.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                In my free time, I enjoy reading, traveling, and spending time
                with my family and friends. I'm also an avid hiker and love
                exploring the great outdoors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
