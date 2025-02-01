import React from "react";
import forest from "../assets/forest.jpg";
import "./Newsdetails.css";
import "./box.css"
const Newsdetails = ({ show, article, Close }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="details-box">
      <div className="details">
        <span className="x-btn">
          <i className="fa-solid fa-xmark" onClick={Close}></i>
        </span>
        {article && (
          <>
            <img src={article.image || {forest}} alt={article.title} className="box-image" />
            <h2 className="box-title">{article.title}</h2>
            <p className="box-source">{article.source.name}</p>
            <p className="box-date">{article.publishedAt}</p>
            <p className="box-content">{article.content}</p>
            <a href={article.url} className="news-link" target="blank">
              <p>READ MORE</p>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Newsdetails;
