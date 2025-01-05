import React, { useContext } from 'react'
import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useState, useEffect } from 'react'
import axiosInstance from './axios.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';




function Rightbar({user}) {

      const PF = process.env.REACT_APP_PUBLIC_FOLDER;
      const [friends,setFriends] = useState([]);
      const { user: currentUser, dispatch } = useContext(AuthContext);
      const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));


      useEffect(()=>{
        const getFriends = async()=>{
          try{
            const friendList = await axiosInstance.get("/api/users/friends/"+user._id);
            setFriends(friendList.data);
          }
          catch(err){
            console.log("Error: ",err.message);
          }
        }
        getFriends();
      },[user])

      const handleClick = async () => {
        try {
          if (followed) {
            await axiosInstance.put(`/api/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
          } else {
            await axiosInstance.put(`/api/users/${user._id}/follow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
          }
          setFollowed(!followed);
        } catch (err) {
        }
      };


  const HomeRightbar = () => {
    return(
      <>
      
        <div className="birthdayContainer">
          <img className='birthdayImg' src={PF+'/birthday.png'} alt="birthday" />
          <span className='birthdayText'>
            <b>Sexy</b> and <b>3 other friends</b> have a birthday today !
          </span>
        </div>
        <h3 className="rightbarTitle">Online Friends</h3>
        <ul className="rightbarFriendList">
          {Users.map((p)=>{
            return(
              <Online key={p.id} user={p}/>
            )
          })}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {

    return(
      <>
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h3 className='rightbarTitle'>User Information</h3>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City : </span>
            <span className="rightbarInfoValue">{user.city ? user.city:"-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">State : </span>
            <span className="rightbarInfoValue">{user.from ? user.from:"-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship : </span>
            <span className="rightbarInfoValue">{user.relationship ? user.relationship : "-"}</span>
          </div>
        </div>
        <h3 className='rightbarTitle'>User Friends</h3>
        <div className="rightbarFollowings">
          {friends.map((p)=>{
            return(
              <Link to={"/profile/"+p.username} style={{textDecoration:"none"}}>
              <div key={p._id} className="rightbarFollowing">
                <img src={p.profilePicture? PF+"/"+p.profilePicture : PF+"/users/noAvatar.png"} alt="" className="rightbarFollowingImg"/>
                <span className="rightbarFollowingName">{p.username}</span>
              </div>
              </Link>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar' style={{flex:"3"}}>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
