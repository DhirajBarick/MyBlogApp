import React from "react";
import "./box.css";
import "./bookmark.css";
import noimg from "../assets/noimg.jpg";
const bookmark = ({show, bookmarks, OnClose, onSelectedArticle ,onDeleteBookmark}) => {
  if(!show){
    return null;
  }
  return (
    <div className="details-box">
      <div className="details">
        <span className="x-btn" onClick={OnClose}>
          <i className="fa-solid fa-xmark" ></i>
        </span>
        <h2 className="bookmark-heading">Bookmarks News</h2>
        <div className="bookmarked-articles">
          {bookmarks.map((article,index) => (

          <div className="bookmarked-article" key={index} 
           onClick={() => onSelectedArticle(article)}>
            <img src={article.image || noimg} alt={article.title} />
            <h3>
              {article.title}
            </h3>
            <span className="delete-icon" onClick={(e) =>{
              e.stopPropagation()
              onDeleteBookmark(article)}
             }>
              <i className="fa-solid fa-trash-can"></i>
            </span>
          </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default bookmark;
