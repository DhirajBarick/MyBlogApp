import React, { useEffect, useState } from "react";
import News from "./Components/News.jsx";
import Blogs from "./Components/Blogs.jsx";
const App = () => {
  const [showNews, setshowNews] = useState(true);
  const [showBlog, setshowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const localBlogs = JSON.parse(localStorage.getItem("blogs") || []);
    setBlogs(localBlogs);
  }, []);
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

  const handleshowBlog = (e) => {
    setshowNews(false);
    setshowBlog(true);
  };
  const handleshowNews = (e) => {
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
