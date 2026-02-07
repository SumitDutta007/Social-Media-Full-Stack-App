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

  const likeHandler = () => {
    const currentUserId = currentUser?._id || currentUser?.id;
    if (!currentUserId) return; // Don't proceed if user is not loaded

    try {
      const postId = post._id || post.id;
      axiosInstance.put("/api/posts/" + postId + "/like", {
        userId: currentUserId,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

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
          <div className="topRight">
            <MoreVertIcon />
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
