import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUser] = useState([{}]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        return;
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      const startIndex = users.length;
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUser((prev) => [...prev, ...data.users]);
        if (data.users.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = () => {};

  return (
    <div className="table-auto overflow-x-scroll  scrollbar md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <Table hoverable className="shadow-lg w-[100%]">
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>username</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>

            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {users.map((user) => (
              <Table.Row className="bg-white dark:bg-gray-700 dark:border-gray-700">
                <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-10 h-10 object-cover rounded-full  bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModel(true);
                      setUserIdToDelete(user._id);
                    }}
                    className="font-bold md:font-medium hover:underline dark:text-red-500  text-red-600 cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no user created yet</p>
      )}
      <Modal
        show={showModel}
        popup
        size={"md"}
        onClose={() => setShowModel(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 mx-auto  text-gray-600 dark:text-gray-200 mb-4" />
            <h3 className="text-lg mx-1 font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete your Account !
            </h3>
            <div className="flex justify-center gap-8 my-2">
              <Button color={"success"} onClick={handleDeleteUser}>
                Yes i'm sure
              </Button>
              <Button color={"failure"} onClick={() => setShowModel(false)}>
                No, cancel{" "}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashUsers;
