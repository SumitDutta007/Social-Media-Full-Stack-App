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
      const userId = user?._id || user?.id;
      
      if (!username && !userId) {
        console.log("User not loaded yet, skipping fetch");
        return; // Don't fetch if user is not loaded
      }

      try {
        console.log("Fetching posts for:", username || userId);
        const res = username
          ? await axiosInstance.get("/api/posts/profile/" + username)
          : await axiosInstance.get("/api/posts/timeline/all/" + userId);
        
        console.log("Fetched posts:", res.data);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        console.error("Error fetching posts:", err.response?.data || err.message);
      }
    };
    fetchPosts();
  }, [username, user?._id, user?.id]);

  return (
    <div className="feed" style={{ flex: "6" }}>
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
            No posts to display. Be the first to share something!
          </p>
        ) : (
          posts.map((p) => {
            return <Post key={p._id || p.id} post={p} />;
          })
        )}
      </div>
    </div>
  );
}

export default Feed;
