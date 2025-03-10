import React from "react";
import noimg from "../assets/noimg.jpg";
import "./Blogsdetails.css";
import "./box.css";
const Blogsdetails = ({ showblog, blog, Closeblog }) => {
  if (!showblog) {
    return null;
  }
  return (
    <div className="details-box">
      <div className="details">
        <span className="x-btn">
          <i className="fa-solid fa-xmark" onClick={Closeblog}></i>
        </span>
        {blog && (
          <>
            <img
              src={blog.image ||  noimg }
              alt={blog.title}
              className="blog-image"
            />
            <div className="blog-title">{blog.title}</div>
            <p className="blog-content">{blog.content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Blogsdetails;
