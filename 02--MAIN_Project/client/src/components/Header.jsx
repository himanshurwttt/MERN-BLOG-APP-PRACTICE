import { Button, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const path = useLocation().pathname;

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
        <Button color={"gray"} pill className="self-center hidden sm:inline">
          <FaMoon />
        </Button>
        <Link to={"sign-in"}>
          <Button color={"gray"}>Sign In</Button>
        </Link>
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
