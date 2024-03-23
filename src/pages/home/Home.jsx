import React from 'react';
import PrimarySearchAppBar from '../../components/topbar/topbar';
import ResponsiveDrawer from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightsidebar/Rightsidebar';

const Home = () => {
    return (
        <div>
            <PrimarySearchAppBar />
            <div className="homeContainer" style={{display:"flex"}}>
                <ResponsiveDrawer />
                <Feed />
                <Rightbar />
            </div>
        </div>
    );
};

export default Home;