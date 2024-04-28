import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Navbar className="border-b-2">
      <Link to={"/"} className="font-bold text-sm sm:text-lg dark:text-white">
        <span className=" bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 text-white px-2 py-1  rounded-md">
          HR's
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="search"
          className="md:inline hidden "
          rightIcon={AiOutlineSearch}
        />
      </form>

      <div className="flex gap-4 md:order-2">
        <Button color={"gray"} pill className="md:hidden ">
          <AiOutlineSearch />
        </Button>
        <Button
          color={"gray"}
          pill
          className="self-center hidden sm:inline"
          onClick={() => dispatch(toggleTheme())}
        >
          <FaMoon />
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user " img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link to={"/dashboard?tab=settings"}>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Link>
            <Link to={"/sign-out"}>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to={"sign-in"}>
            <Button color={"gray"}>Sign In</Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={path === "/"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/about"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/projects"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
