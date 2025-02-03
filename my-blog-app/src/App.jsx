import React, { useState } from 'react'
import News from './Components/News.jsx'
import Blogs from './Components/Blogs.jsx'
const App = () => {
  const [showNews,setshowNews] = useState(true);
  const [showBlog,setshowBlog] = useState(false); 
  const [blogs,setBlogs] = useState([]);

  const handleCreateBlogs = (newBlog) => {
    setBlogs((b) => [...b,newBlog]);
  }

  const handleshowBlog = (e) => {
    setshowNews(false);
    setshowBlog(true);
  }
  const handleshowNews = (e) => {
    setshowNews(true);
    setshowBlog(false);
  }
  return (
    <div>
      <div className="container">
        <div className="blog-news-app">
          {showNews && <News onShowBlog={handleshowBlog} blogs={blogs} />}
          {showBlog && <Blogs onShowNews={handleshowNews} onCreateBlog={handleCreateBlogs} />}
          </div>
      </div>
      </div>
  )
}

export default App;
