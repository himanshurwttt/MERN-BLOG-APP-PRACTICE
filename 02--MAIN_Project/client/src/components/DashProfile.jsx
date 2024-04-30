import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 w-full max-w-lg mx-auto">
      <h1 className="w-full text-center font-semibold my-7 text-3xl">
        Profile
      </h1>
      <form className="flex flex-col gap-5">
        <div className="self-center">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full"
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="text-center "
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="text-center "
        />
        <TextInput
          type="text"
          placeholder="password"
          id="password"
          className="text-center "
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5 font-semibold">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
