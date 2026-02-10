import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axiosInstance from "../../axios.js";
import { AuthContext } from "../../context/AuthContext";
import "./post.css";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const currentUserId = currentUser?._id || currentUser?.id;
    setIsLiked(post.likes.includes(currentUserId));
  }, [currentUser?._id, currentUser?.id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.topRight')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  const likeHandler = () => {
    const currentUserId = currentUser?._id || currentUser?.id;
    if (!currentUserId) {
      console.log("User not logged in");
      return; // Don't proceed if user is not loaded
    }

    try {
      const postId = post._id || post.id;
      // No need to send userId in body - backend gets it from JWT token
      axiosInstance.put("/api/posts/" + postId + "/like");
    } catch (err) {
      console.log("Error liking post:", err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const postId = post._id || post.id;
      await axiosInstance.delete(`/api/posts/${postId}`);
      setIsDeleted(true);
      alert("Post deleted successfully!");
      // Reload page to reflect changes
      window.location.reload();
    } catch (err) {
      console.error("Error deleting post:", err);
      const errorMsg = err.response?.data?.message || "Failed to delete post";
      alert(errorMsg);
    }
  };

  // Check if current user can delete this post (owner or admin)
  const canDelete = () => {
    const currentUserId = currentUser?._id || currentUser?.id;
    const postUserId = post.userId;
    const isAdmin = currentUser?.isAdmin;
    
    return currentUserId === postUserId || isAdmin;
  };

  // Don't render if post is deleted
  if (isDeleted) {
    return null;
  }

  return (
    <div className="posts">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + "/" + user.profilePicture
                    : PF + "/users/noAvatar.png"
                }
                alt="user"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="topRight" style={{ position: 'relative' }}>
            {canDelete() && (
              <>
                <MoreVertIcon 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="postMenu">
                    <button 
                      className="postMenuButton deleteButton"
                      onClick={deleteHandler}
                    >
                      {currentUser?.isAdmin && post.userId !== (currentUser?._id || currentUser?.id) 
                        ? '🗑️ Delete (Admin)' 
                        : '🗑️ Delete Post'
                      }
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post?.img && (
            <img
              className="postImg"
              src={
                post.img.startsWith("http")
                  ? post.img
                  : `${PF}/posts/${post.img}`
              }
              alt=""
              onError={(e) => {
                console.log("Image load error:", post.img);
                e.target.style.display = "none";
              }}
            />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeHandler}
              className="likeIcon"
              src={`${PF}/like.png`}
              alt=""
            />
            <img
              onClick={likeHandler}
              className="likeIcon"
              src={`${PF}/heart.png`}
              alt=""
            />
            <span className="postLikeCounter">{like} Likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
