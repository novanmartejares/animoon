"use client";
import React, { useState } from "react";
import "./top-ten.css";
import { FaClosedCaptioning } from "react-icons/fa";
import Link from "next/link";
import { AiFillAudio } from "react-icons/ai";
export default function TopTenAnime(props) {
  
  const [period, setPeriod] = useState("today");
  const animeList = props.data;
  let sortedList = [];
  if (period === "today") {
    sortedList = animeList?.today;
  }
  if (period === "week") {
    sortedList = animeList?.week;
  }
  if (period === "month") {
    sortedList = animeList?.month;
  }
  const list = sortedList?.map((el, idx) => {
    const title = el.name || el.attributes.titles.en_jp;
    return (
      <li
        key={title}
        className="d-flex a-center"
      >
        <span
          className={`rank ${0 < el.rank && el.rank <= 3 ? "top-three" : ""}`}
        >
          {el.rank > 9 ? el.rank : "0" + el.rank.toString()}
        </span>
        <div className="top-10-item d-flex a-center">
          <img src={el.poster} alt="poster"/>
          <div className="anime-details d-flex-fd-column">
            <span className="title">
              <Link
                href={`/${el.id}`}
                className="trans-03"
              >
                {title.length < 30 ? title : title.slice(0, 30) + "..."}
              </Link>
            </span>
            <div className="episode-info d-flex ">
              <span className="episode-count">
                <FaClosedCaptioning size={14} /> {el.episodes.sub || "Unknown"}
              </span>

              {el.episodes.dub ? (
                <span className="quality d-flex a-center j-center">
                  <AiFillAudio size={14} /> {el.episodes.dub || "Unknown"}
                </span>
              ) : (
                ""
              )}
              <div className="dotoo">&#x2022;</div>
              <div className="show-type">TV</div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div
      className="top-ten-wrapper"
    >
      <div className="top-ten-header d-flex a-center">
        <h2 className="topTen">Top 10</h2>
        <div className="top-ten-tabs">
          <button
            onClick={() => setPeriod("today")}
            className={`${
              period === "today" ? "selected" : ""
            } period-selector f-poppins`}
          >
            Today
          </button>
          <button
            onClick={() => setPeriod("week")}
            className={`${
              period === "week" ? "selected" : ""
            } period-selector f-poppins`}
          >
            Week
          </button>
          <button
            onClick={() => setPeriod("month")}
            className={`${
              period === "month" ? "selected" : ""
            } period-selector f-poppins`}
          >
            Month
          </button>
        </div>
      </div>
      <ul>{list}</ul>
    </div>
  );
}
