import CancelIcon from "@mui/icons-material/Cancel";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import React, { useContext, useRef, useState } from "react";
import axiosInstance from "../../axios.js";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit button clicked");
    console.log("User data:", user);

    if (!user?._id && !user?.id) {
      console.error("User not loaded or no user ID found");
      alert("Please login to create a post");
      return;
    }

    const userId = user._id || user.id;
    console.log("Using userId:", userId);

    const newPost = {
      userId: userId,
      desc: desc.current.value,
    };

    console.log("New post data (before image):", newPost);

    // Upload image to Cloudinary if file is selected
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      
      try {
        console.log("Uploading image to Cloudinary...");
        const uploadRes = await axiosInstance.post("/api/posts/upload", formData);
        console.log("Upload response:", uploadRes.data);
        
        // Use the Cloudinary URL from response
        newPost.img = uploadRes.data.imageUrl;
        console.log("Image URL saved:", newPost.img);
      } catch (err) {
        console.error("Upload error:", err.response?.data || err.message);
        const errorMsg = err.response?.data?.message || "Failed to upload image. Please try again.";
        alert(errorMsg);
        return; // Don't create post if upload fails
      }
    }
    
    try {
      console.log("Creating post with data:", newPost);
      const response = await axiosInstance.post("/api/posts", newPost);
      console.log("Post created successfully:", response.data);
      alert("Post created successfully!");
      
      // Clear form
      desc.current.value = "";
      setFile(null);
      
      // Reload to show new post
      window.location.reload();
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Failed to create post. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user?.profilePicture
                ? PF + "/" + user.profilePicture
                : PF + "/users/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user?.username || "there"}? `}
            ref={desc}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="red" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="gold" className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
