import React, { useRef, useState } from "react";
import { CgFormatJustify } from "react-icons/cg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
export default function Header() {
  const boxRef = useRef(null);
  const { contextSafe } = useGSAP();
  const [showbox, setShowbox] = useState(false);

  const handleHamburg = contextSafe(() => {
    if (!showbox) {
      setShowbox(true);
      gsap.set(boxRef.current, { opacity: 0, duration: 3, top: 0 });
      gsap.to(boxRef.current, { opacity: 1, duration: 3, top: 48 });
    } else {
      setShowbox(false);
    }
  });

  return (
    <>
      <nav className="w-full text-sm p-2 justify-center items-center max-w-screen-2xl mx-auto">
        <div className="h-14 bg-blue-900 shadow-xl  border border-blue-900 rounded-2xl flex justify-between items-center">
          <div className="left">
            <Link to={"/"}>
              <div className="logo px-5 font-bold text-white ">BLOGS</div>
            </Link>
          </div>

          <div className="right flex gap-2 px-2 sm:px-6 relative items-center">
            <div className="hidden md:flex">
              <ul className="flex  gap-10 text-white font-sans  mx-5">
                <li>
                  <Link to={"/"}> Home</Link>
                </li>
                <li>
                  <Link to={"/about"}> About</Link>
                </li>
                <li>
                  <Link to={"/"}> Profile</Link>
                </li>
              </ul>
            </div>
            <Link to={"/signin"}>
              <button className="border shadow-md border-white text-white w-20 h-10 rounded-lg hover:bg-white hover:text-black duration-300">
                sign in
              </button>
            </Link>
            <div className="md:hidden">
              <button
                className="border p-1 rounded-full w-10 h-10 flex justify-center items-center text-white hover:bg-white hover:text-black duration-300"
                onClick={handleHamburg}
              >
                <CgFormatJustify className="w-6 h-6 " />
              </button>
              {showbox && (
                <ul
                  ref={boxRef}
                  className=" absolute flex  right-0 top-12 mt-2 rounded-2xl bg-gray-600 text-white w-24 px-3 gap-2 p-2 flex-col "
                >
                  <li>
                    <Link to={"/"}> Home</Link>
                  </li>
                  <li>
                    <Link to={"/about"}> About</Link>
                  </li>
                  <li>
                    <Link to={"/"}> Profile</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
