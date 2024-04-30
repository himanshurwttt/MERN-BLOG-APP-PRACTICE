import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashSetting from "../components/DashSetting";

const Dashboard = () => {
  const location = useLocation();
  const [tab, settab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      settab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div>
      <div className="">
        <DashSidebar />
      </div>
      {/* {tab === "profile" ? <DashProfile /> : <DashSetting />} */}
      {tab === "profile" && <DashProfile />}
      {/* {tab === "setting" && <DashSetting />} */}
    </div>
  );
};

export default Dashboard;
