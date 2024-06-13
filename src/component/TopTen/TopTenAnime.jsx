"use client";
import React, { useEffect, useRef, useState } from "react";
import "./top-ten.css";
import { FaClosedCaptioning } from "react-icons/fa";
import Link from "next/link";
import { easeOut, motion } from "framer-motion";
import useAnimationOnce from "@/hooks/useAnimationOnce";
import LazyImage from "@/utils/LazyImage";
import useAnime from "@/hooks/useAnime";
import { AiFillAudio } from "react-icons/ai";
export default function TopTenAnime(props) {
  let hour = props.hour;
  let min = props.min;
  let hours = props.hours;
  let minute = props.minute;
  const ref = useRef(null);
  const containerInView = useAnimationOnce(ref);
  const { getHome } = useAnime();
  const [datal, setDatal] = useState(props.data);
  const fetchPub = async () => {
    const dat = await getHome(hour, min, hours, minute);
    console.log(dat);
    if (dat.length > 0) {
      setDatal(dat);
    }
  };
  useEffect(() => {
    fetchPub();
  }, []);
  const [period, setPeriod] = useState("today");
  const animeList = datal?.top10Animes;
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
      <motion.li
        key={title}
        className="d-flex a-center"
        initial={{ opacity: 0 }}
        animate={containerInView && { opacity: 1, x: ["100%", "-3%", "0%"] }}
        transition={{ duration: 0.1 * idx }}
      >
        <span
          className={`rank ${0 < el.rank && el.rank <= 3 ? "top-three" : ""}`}
        >
          {el.rank > 9 ? el.rank : "0" + el.rank.toString()}
        </span>
        <div className="top-10-item d-flex a-center">
          <LazyImage src={el.poster} alt="poster" isInView={containerInView} />
          <div className="anime-details d-flex-fd-column">
            <span className="title">
              <Link
                onClick={() => window.scrollTo({ top: 0 })}
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
      </motion.li>
    );
  });

  return (
    <motion.div
      className="top-ten-wrapper"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={
        containerInView
          ? { opacity: 1, x: ["10%", "-3%", "0%"] }
          : { opacity: 0 }
      }
      transition={{ duration: 0.6, ease: easeOut }}
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
    </motion.div>
  );
}
