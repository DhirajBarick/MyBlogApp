import React, { useState } from "react";
import "./Calender.css";
const Calender = () => {
  const daysofWeek = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
  const monthsofYear = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const [currentmonth, setCurrentmonth] = useState(currentDate.getMonth());
  const [currentyear, setCurrentyear] = useState(currentDate.getFullYear());
  const daysinMonth = new Date(currentyear, currentmonth + 1, 0).getDate();
  const firstday = new Date(currentyear, currentmonth, 1).getDay();

  console.log(currentmonth, currentyear, daysinMonth, firstday);
  const prevMonth = () => {
    setCurrentmonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1 ))
    setCurrentyear((prevyear) => (currentmonth === 0 ? prevyear - 1 : prevyear))
  }
  const nextMonth = () => {
    setCurrentmonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1 ))
    setCurrentyear((prevyear) => (currentmonth === 11 ? prevyear + 1 : prevyear))
  }
  return (
    <div className="calender">
      <div className="calender-details">
        <h2 className="month">
          {monthsofYear[currentmonth]},
        </h2>
        <h2 className="year">{currentyear}</h2>
        <div className="buttons">
          <i className="fa-solid fa-chevron-left" onClick={prevMonth}></i>
          <i className="fa-solid fa-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="grid-days">
        {daysofWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="grid-date">
        {[...Array(firstday).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}
        {[...Array(daysinMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={
              day + 1 === currentDate.getDate() &&
              currentmonth === currentDate.getMonth() &&
              currentyear === currentDate.getFullYear()
                ? "current-date"
                : ""
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calender;
