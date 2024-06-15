import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";

export default function dashUsers() {
  const [users, setUsers] = useState([]);
  const [fetchProcess, setFetchProcess] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const fetchUsers = async () => {
    try {
      setFetchProcess(true);
      const res = await fetch("/api/user/getUsers");
      const data = await res.json();
      if (!res.ok) {
        setFetchProcess(false);
        setFetchError(data.message);
      } else {
        setFetchProcess(false);
        setUsers(Array.isArray(data.users) ? data.users : []);
        console.log(data);
      }
    } catch (error) {
      setFetchError(error.message);
      setFetchProcess(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  return (
    <div className="w-full max-w-screen-xl h-[90vh] overflow-hidden z-10  flex flex-col gap-4  p-4 sm:p-5 md:p-6 max-h-[90vh]      mx-auto  ">
      <div className="grid gap-6 sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4  px-10 py-2 overflow-y-scroll  ">
        {fetchProcess ? (
          <LoadingSpinner />
        ) : users ? (
          users.map((user) => (
            <div
              key={user._id}
              className="group rounded-lg p-1 py-3 border bg-[#f8f8ff] border-[#f8f8ff] flex flex-col items-center gap-6 h-60"
            >
              <img
                src={user.profilePicture}
                alt={user.username}
                className=" w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col text-center">
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Joined {formatDistanceToNow(new Date(user.createdAt))} ago
                </div>
              </div>
              <button
                variant="ghost"
                size="icon"
                className="md:opacity-0 md:group-hover:opacity-100 duration-300"
              >
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Delete User</span>
              </button>
            </div>
          ))
        ) : (
          "no user yet"
        )}
      </div>
    </div>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
