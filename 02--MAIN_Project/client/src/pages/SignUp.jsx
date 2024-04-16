import React, { useRef, useState } from "react";
import { Button, Label } from "flowbite-react";
import { Link } from "react-router-dom";
import { TextInput } from "flowbite-react";
const SignUp = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" min-h-screen  ">
      <div className="flex flex-col  gap-5 md:flex-row md:items-center p-3 mx-auto max-w-3xl pt-[10%]">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sahand's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form
            className="flex flex-col gap-4 mt-4 sm:mt-0"
            onSubmit={handleOnSubmit}
          >
            <div>
              <Label value="Your UserName" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                // ref={username}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                onChange={handleChange}
                placeholder="name@company.com"
                id="email"
                type="text"
                // ref={email}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                id="password"
                type="text"
                placeholder="password"
                // ref={password}
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              // onClick={handleChange}
            >
              Sign In
            </Button>
          </form>
          <div className="flex gap-4 text-sm mt-5">
            <span>already have an account ?</span>
            <Link to={"/sign-in"} className="text-blue-600 font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
