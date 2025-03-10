import React, { useEffect, useState } from "react";
import "./Blogs.css";
import cr7 from "../assets/cr7.jpg";
import galaxy from "../assets/galaxy.webp";

const NewPostEnhanced = ({ onShowNews, onCreateBlog ,editPost, isEditing }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [validtitle, setValidtitle] = useState(false);
  const [validcontent, setValidcontent] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() =>{
    if(isEditing && editPost){
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
     }
     else{
      setImage(null)
      setTitle("");
      setContent("");
      setShowForm(false);
     }

  },[isEditing,editPost])

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file= e.target.files[0];
      const maxsize = 1 * 1024 * 1024 //to bytes

      if(file.size > maxsize){
        alert("File size exceeds 1 MB")
        return
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }; 

  const handleTitle = (e) =>{
    setTitle(e.target.value);
    setValidtitle(true);
  }
  const handleContent = (e) =>{
    setContent(e.target.value);
    setValidcontent(true);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !content){
      if(!title) setValidtitle(false)
      if(!content) setValidcontent(false)
        return;
    }

    const newblogs = {
      image,
      title,
      content,
    };
    onCreateBlog(newblogs, isEditing);
    setImage(null);
    setTitle("");
    setContent("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onShowNews()
    }, 3000);
  };

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
        <button className="back-button" onClick={onShowNews} >
          ← Back
        </button>
        {!showForm && !submitted && (
          <button className="create-btn" onClick={() => {
            setShowForm(true);
            setValidtitle(true);
            setValidcontent(true); 
          }}>
            Create Post
          </button>
        )}
        {submitted && <p className="submittedtext">Post Published!</p>}
        <form
          onSubmit={handleSubmit}
          className={`${showForm ? "form-visble" : "form-hidden"}`}
        >
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
                onChange={(e) => {
                  handleFileInput(e);
                  handleImageUpload(e);
                }}
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Write your title here (Max 60 characters)"
            className={`title-input ${!validtitle ? 'notvalid' : ''}`}
            maxLength={40}
            value={title}
            onChange={handleTitle}
          />
          <textarea
            placeholder="Share your thoughts..."
            className={`text-input ${!validcontent ? 'notvalid' : ''}`}
            rows="6"
            value={content}
            onChange={handleContent}
          ></textarea>
          <button className="submit-button">PUBLISH POST</button>
        </form>
      </div>
    </div>
  );
};

export default NewPostEnhanced;
