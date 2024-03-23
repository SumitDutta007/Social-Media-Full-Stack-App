import React from 'react'
import './friend.css'

function Friends({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user)

  return (
    <li className="sidebarFriend">
          <img src={(user.profilePicture)?PF+"/"+user.profilePicture : PF+"/users/noAvatar.png"} alt="friend" className="sidebarFriendImg" />
          <span className="sidebarFriendName">{user.username}</span>
        </li>
  )
}

export default Friends