import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios.js";
import { AuthContext } from "../../context/AuthContext";
import Post from "../posts/Post";
import Share from "../share/Share";
import "./feed.css";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!username && !user?.id) return; // Don't fetch if user is not loaded

      const res = username
        ? await axiosInstance.get("/api/posts/profile/" + username)
        : await axiosInstance.get("/api/posts/timeline/all/" + user.id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user?.id]);

  return (
    <div className="feed" style={{ flex: "6" }}>
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {posts.map((p) => {
          return <Post key={p.id} post={p} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
