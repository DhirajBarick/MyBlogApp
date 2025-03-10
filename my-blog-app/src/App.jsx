import React, { useEffect, useState } from "react";
import News from "./Components/News.jsx";
import Blogs from "./Components/Blogs.jsx";
const App = () => {
  const [showNews, setshowNews] = useState(true);
  const [showBlog, setshowBlog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [blogs, setBlogs] = useState(() => {
    try {
      const savedBlogs = localStorage.getItem("blogs");
      return savedBlogs ? JSON.parse(savedBlogs) : [];
    } catch (error) {
      console.error("Error parsing blogs from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    } catch (error) {
      console.error("Error saving blogs to localStorage:", error);
    }
  }, [blogs]);

  const handleCreateBlogs = (newBlog, edit) => {
    setBlogs((b) => 
      edit 
        ? b.map((blog) => (blog === selectedPost ? newBlog : blog)) 
        : [...b, newBlog]
    );
    setEditing(false);
    setSelectedPost(null);
};
const handleDeleteBlogs = (blog) => {
  setBlogs((b) => {
    const updatedBlogs = b.filter((b) => b !== blog); 
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs)); 
    return updatedBlogs; 
  });
};

  const handleEditPost = (blog) =>{
    setSelectedPost(blog);
    setEditing(true);
    setshowNews(false);
    setshowBlog(true);
  }
  const handleshowBlog = () => {
    setshowNews(false);
    setshowBlog(true);
  };
  const handleshowNews = () => {
    setshowNews(true);
    setshowBlog(false);
    setEditing(false);
    setSelectedPost(null);
  };
  return (
    <div>
      <div className="container">
        <div className="blog-news-app">
          {showNews && (
            <News
              onShowBlog={handleshowBlog}
              blogs={blogs}
              onDelete={handleDeleteBlogs}
              onEditBlog={handleEditPost}
            />
          )}
          {showBlog && (
            <Blogs
              onShowNews={handleshowNews}
              onCreateBlog={handleCreateBlogs}
              editPost={selectedPost}
              isEditing={editing}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
