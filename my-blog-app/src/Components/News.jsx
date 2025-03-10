import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calender from "./Calender";
import Newsdetails from "./Newsdetails";
import Bookmark from "./Bookmark";
import Blogsdetails from "./Blogsdetails.jsx";
import "./news.css";
import userimg from "../assets/userimg.jpg";
import noimg from "../assets/noimg.jpg";
import axios from "axios";

const News = ({ onShowBlog, blogs, onDelete, onEditBlog }) => {
  const [mainnews, setMainnews] = useState(null);
  const [news, setnews] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [showbox, setShowbox] = useState(false);
  const [selected, setSelected] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksBox, setBookmarksBox] = useState(false);
  const [showBlogbox, setShowBlogbox] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-hadlines?category=general&lang=en&apikey=0e7415b5d28b765a63c712ced528d65c`;

      if (query) {
        url = `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=0e7415b5d28b765a63c712ced528d65c`;
      }
      const response = await axios.get(url);
      const data = response.data.articles;
      setMainnews(data[0]);
      setnews(data.slice(1, 7));
      const localBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(localBookmarks);
      console.log(data);
    };
    fetchNews();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    const searchinput = document.getElementById("newssearch");
    searchinput.blur();
  };

  const handleSelectedarticle = (article) => {
    setSelected(article);
    setShowbox(true);
    console.log(article);
  };
  const handleSelectedblog = (blogs) => {
    setSelectedBlog(blogs);
    setShowBlogbox(true);
    console.log(blogs);
  };

  const handleBookmarks = (article) => {
    setBookmarks((b) => {
      const updatedBookmarks = b.find(
        (bookmark) => bookmark.title === article.title
      )
        ? b.filter((bookmark) => bookmark.title !== article.title)
        : [...b, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="title">BLOG AND NEWS APP</h1>
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              id="newssearch"
              autoComplete="off"
              type="text"
              value={search}
              placeholder="Search News Topic"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="nav-bar">
          <div className="user">
            <img src={userimg} alt="User Img" onClick={onShowBlog} />
            <p>User</p>
          </div>
          <nav className="categories">
            <div className="todo-list">
              <p>To-Do List</p>
              <input type="text" className="input" placeholder="Enter a Task" />
              <button className="addbtn">Add</button>
            </div>
            <div className="bookmark" onClick={() => setBookmarksBox(true)}>
              Bookmark
              <i className={`fa-solid fa-bookmark`}></i>
            </div>
          </nav>
        </div>
        <div className="news-area">
          {mainnews && (
            <div
              className="news-main"
              onClick={() => handleSelectedarticle(mainnews)}
            >
              <img src={mainnews.image || noimg} alt={mainnews.title} />
              <h2 className="news-title">
                {mainnews.title}
                <i
                  className={`${
                    bookmarks.some(
                      (bookmark) => bookmark.title === mainnews.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarks(mainnews);
                  }}
                ></i>
              </h2>
            </div>
          )}
          <div className="news-all">
            {news.map((value, index) => (
              <div
                className="news-items"
                key={index}
                onClick={() => handleSelectedarticle(value)}
              >
                <img src={value.image || noimg} alt={value.title} />
                <h3>
                  {value.title}
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === value.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarks(value);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <Newsdetails
          show={showbox}
          article={selected}
          Close={() => setShowbox(false)}
        />
        <Bookmark
          show={bookmarksBox}
          bookmarks={bookmarks}
          OnClose={() => setBookmarksBox(false)}
          onSelectedArticle={handleSelectedarticle}
          onDeleteBookmark={handleBookmarks}
        />
        <div className="my-blogs">
          <div className="blogs-heading">MY BLOGS</div>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div className="blog-post" key={index}>
                <img
                  src={blog.image || noimg}
                  alt={blog.title}
                  onClick={() => handleSelectedblog(blog)}
                />
                <h3 onClick={() => handleSelectedblog(blog)}>{blog.title}</h3>
                <div className="blog-btn">
                  <button
                    className="blog-edit"
                    onClick={() => onEditBlog(blog)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className="blog-delete"
                    onClick={(e) => {
                      e.stopPropagation(e);
                      onDelete(blog);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Blogsdetails
          showblog={showBlogbox}
          blog={selectedBlog}
          Closeblog={() => setShowBlogbox(false)}
        />
        <div className="WCarea">
          <Weather />
          <Calender />
        </div>
      </div>
      <div className="footer">
        <p>
          <span>Blog and News App</span>
        </p>
        <p>&copy; All Rights Reserved. By Dhirajkumar Barick</p>
      </div>
    </div>
  );
};

export default News;
