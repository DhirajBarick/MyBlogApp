import React, { useEffect, useState } from "react";
import News from "./Components/News.jsx";
import Blogs from "./Components/Blogs.jsx";
const App = () => {
  const [showNews, setshowNews] = useState(true);
  const [showBlog, setshowBlog] = useState(false);
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

  const handleCreateBlogs = (newBlog) => {
    setBlogs((b) => {
      const updatedBlogs = [...b, newBlog];
      localStorage.setItem("blog", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };
  const handleDeleteBlogs = (blog) => {
    setBlogs((b) => b.filter((b) => b !== blog));
  };

  const handleshowBlog = () => {
    setshowNews(false);
    setshowBlog(true);
  };
  const handleshowNews = () => {
    setshowNews(true);
    setshowBlog(false);
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
            />
          )}
          {showBlog && (
            <Blogs
              onShowNews={handleshowNews}
              onCreateBlog={handleCreateBlogs}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
