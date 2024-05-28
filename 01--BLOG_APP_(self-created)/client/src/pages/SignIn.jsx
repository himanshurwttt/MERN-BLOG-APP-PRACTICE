import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
const SignIn = () => {
  const [type, setType] = useState("password");

  return (
    <div className="w-full h-[90vh]">
      <div className=" w-full h-full p-4 px-10">
        <h1 className="text-6xl text-center font-bold">BLOGS</h1>
        <div className="box  mx-auto m-4">
          <form className="max-w-96 border mt-6 border-white bg-blue-50 mx-auto flex flex-col gap-6   drop-shadow-2xl rounded-2xl p-5">
            <h2 className=" text-center text-3xl font-semibold text-gray-700">
              SIGN IN
            </h2>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Email:</label>
              <input
                className="rounded-md px-4 drop-shadow-md  p-[0.35rem]"
                placeholder="abc@xyz.com"
              />
            </div>
            <div className="flex flex-col gap-3 drop-shadow-md">
              <label htmlFor="">password:</label>
              <div className="flex items-center">
                <input
                  type={type}
                  className="rounded-md w-full px-4 p-[0.35rem]"
                  placeholder="**************"
                />
                <button
                  onClick={() => {
                    type === "password" ? setType("text") : setType("password");
                  }}
                  type="button"
                  className="absolute right-4"
                >
                  {type === "password" ? (
                    <BiSolidHide className="h-12 w-5" />
                  ) : (
                    <BiSolidShow className="h-12 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="btns mt-5 flex flex-col gap-3">
              <button className="border active:scale-[0.9] h-10 rounded-xl bg-blue-600 text-white shadow-xl duration-300">
                submit
              </button>
              <button className="border h-10 active:scale-[0.9]  rounded-xl bg-white shadow-xl duration-300">
                signin with google
              </button>
            </div>
            <p className="text-sm">
              don't have an account?{" "}
              <Link className="text-blue-600" to={"/signup"}>
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
