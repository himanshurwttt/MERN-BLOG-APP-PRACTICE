import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashComments from "../components/DashComments";
import DashSideBar from "../components/DashSideBar";
import { useSelector } from "react-redux";
import DashComp from "../components/DashComp";
import DashUsers from "../components/DashUsers";

export default function DashBoard() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const location = useLocation();
  const URLparams = new URLSearchParams(location.search);

  useEffect(() => {
    const gettab = URLparams.get("tab");
    if (gettab) {
      setTab(gettab);
    }
  }, [location.search]);

  return (
    <>
      {currentUser ? (
        <div className="md:min-h-screen max-w-screen-2xl mx-auto bg-blue-250 flex justify-between flex-col md:flex-row">
          {tab === "profile" && <DashProfile />}
          {tab === "dashboardComp" && <DashComp />}
          {tab === "posts" && <DashPosts />}
          {tab === "comments" && <DashComments />}
          {tab === "users" && <DashUsers />}
          {/* {tab === "profile" && <DashProfile />} */}
          <div className="md:max-w-64  md:min-w-60 drop-shadow-2xl pt-0 pb-1">
            {/* Sidebar */}
            <DashSideBar />
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
