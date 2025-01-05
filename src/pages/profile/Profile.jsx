import React,{useState , useEffect} from 'react'
import PrimarySearchAppBar from '../../components/topbar/topbar';
import ResponsiveDrawer from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightsidebar/Rightsidebar';
import './profile.css'
import axiosInstance from 'axios.js';
import { useParams } from 'react-router'

function Profile() {

  const [user,setUser] = useState({});
  const username = useParams().username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const fetchUser = async()=>{
      const res = await axiosInstance.get(`/users?username=${username}`)
      setUser(res.data);
    }
    fetchUser();
  },[username])

  return (
    <div>
            <PrimarySearchAppBar />
            <div className="profile" style={{display:"flex"}}>
                <ResponsiveDrawer />
                <div className="profileRight">
                    <div className="profileRightTop">
                      <div className="profileCover">
                        <img className='profileCoverImg' src={user.coverPicture? PF+"/"+user.coverPicture : PF+"/posts/post3.jpg"} alt="" />
                        <img className='profileUserImg' src={user.profilePicture? PF+"/"+user.profilePicture : PF+"/users/noAvatar.png"} alt="" />
                      </div>
                      <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                      </div>
                    </div>
                    <div className="profileRightBottom">
                      <Feed username={username}/>
                      <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Profile
