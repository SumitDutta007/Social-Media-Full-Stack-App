import React from "react";
import BottomNav from "../../components/bottomNav/BottomNav";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightsidebar/Rightsidebar";
import ResponsiveDrawer from "../../components/sidebar/Sidebar";
import PrimarySearchAppBar from "../../components/topbar/topbar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <PrimarySearchAppBar />
      <div className="homeContainer">
        <ResponsiveDrawer />
        <Feed />
        <Rightbar />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
