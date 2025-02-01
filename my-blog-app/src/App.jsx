import React, { useState } from 'react'
import News from './Components/News.jsx'
import Blogs from './Components/Blogs.jsx'
const App = () => {
  const [showNews,setshowNews] = useState(true);
  const [showBlog,setshowBlog] = useState(false); 

  const handleshowBlog = () => {
    setshowNews(false);
    setshowBlog(true);
  }
  const handleshowNews = () => {
    setshowNews(true);
    setshowBlog(false);
  }
  return (
    <div>
      <div className="container">
        <div className="blog-news-app">
          {showNews && <News onShowBlog={handleshowBlog}/>}
          {showBlog && <Blogs onShowNews={handleshowNews}/>}
          </div>
      </div>
      </div>
  )
}

export default App;
