import React, { useState } from "react";
import "./Blogs.css";
import cr7 from "../assets/cr7.jpg";
import galaxy from "../assets/galaxy.webp";

const NewPostEnhanced = ({ onShowNews }) => {
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setIsUploaded(true);
    }
  };

  return (
    <div className="new-post-container">
      <div className="image-section">
        <img src={galaxy} alt="Background" className="background-image" />
        <div className="profile-picture">
          <img src={cr7} alt="Profile" className="profile-image" />
        </div>
      </div>
      <div className="form-section">
        <button className="back-button" onClick={onShowNews}>
          ← Back
        </button>
        {showForm ? (
          <form action="#">
            <h1 className="form-title">New Post</h1>
            <div className="upload-section">
              <div
                className={`upload-input ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isUploaded ? (
                  <div className="upload-success">
                    <i className="fa-solid fa-check upload-icon"></i>
                    <span className="upload-text">
                      Image uploaded successfully!
                    </span>
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
                    <span className="upload-text">
                      Drag and drop an image or click to upload
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Write your title here (Max 60 characters)"
              className="title-input"
              maxLength={60}
            />
            <textarea
              placeholder="Share your thoughts..."
              className="text-input"
              rows="6"
            ></textarea>
            <button className="submit-button">PUBLISH POST</button>
          </form>
        ) : (
          <button className="create-btn" onClick={() =>
            setShowForm(true)}>
            Create Post
          </button>
        )}
      </div>
    </div>
  );
};

export default NewPostEnhanced;
