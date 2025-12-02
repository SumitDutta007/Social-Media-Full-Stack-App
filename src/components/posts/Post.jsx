import React, { useEffect, useState } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axiosInstance from '../../axios.js';
import {format} from 'timeago.js'
import {Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Post({post}) {
    const [like,setLike]=useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axiosInstance.get(`/api/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }
    ,[post.userId])

    const likeHandler = ()=>{
        try{
            axiosInstance.put('/api/posts/'+post._id+'/like',{userId:currentUser._id})
        }
        catch(err){
            console.log(err)
        }
        setLike(isLiked? like-1 : like+1)
        setIsLiked(!isLiked)
    }

  return (
    <div className='posts'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`} style={{textDecoration:'none',color:'black'}}>
                    <img className='postProfileImg' src={user.profilePicture? PF+'/'+user.profilePicture : PF+"/users/noAvatar.png"} alt="user" />
                    </Link>
                    <span className='postUsername'>{user.username}</span>
                    <span className='postDate'>{format(post.createdAt)}</span>
                </div>
                <div className="topRight">
                    <MoreVertIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className='postText'>{post?.desc}</span>
                <img className='postImg' src={PF+'/posts/'+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img onClick={likeHandler} className='likeIcon' src={`${PF}/like.png`} alt="" />
                    <img onClick={likeHandler} className='likeIcon' src={`${PF}/heart.png`} alt="" />
                    <span className='postLikeCounter'>{like} Likes</span>
                </div>
                <div className="postBottomRight">
                    <span className='postCommentText'>{post.comment}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
