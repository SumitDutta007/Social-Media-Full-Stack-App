import React,{useEffect, useState} from 'react'
import './feed.css'
import Share from "../share/Share"
import axiosInstance from "../../axios.js"
import Post from "../posts/Post"
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

function Feed({username}) {

  const [posts,setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = username? await axiosInstance.get("/api/posts/profile/"+username) :await axiosInstance.get("/api/posts/timeline/all/"+user._id)
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPosts()
    
  },[username,user._id])

  return (
    <div className="feed" style={{flex:"6"}}>
      <div className="feedWrapper">
        {(!username || username === user.username)  && <Share/>}
        {posts.map((p)=>{
          return(
            <Post key={p._id} post={p}/>
          )
        })}
      </div>
    </div>
  )
}

export default Feed
