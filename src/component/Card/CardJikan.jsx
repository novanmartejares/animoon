"use client";
import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import Link from "next/link";
import MouseOverCard from "./MouseOverCard";
import { FaClosedCaptioning, FaPlayCircle } from "react-icons/fa";
import { easeOut, motion, useInView } from "framer-motion";
import LazyImage from "@/utils/LazyImage";
import { AiFillAudio } from "react-icons/ai";
export default function Card(props) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef);
  const anime = props.data;
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const setWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    const listener = window.addEventListener("resize", setWidth);
    return () => window.removeEventListener(listener, setWidth);
  });
  const startN = () => {
    if (props.collectionName !== "Top Upcoming") {
      window.location.href = localStorage.getItem(`Rewo-${anime.data_id}`)
        ? `/watch/${localStorage.getItem(`Rewo-${anime.data_id}`)}`
        : `/watchi/${anime.data_id}`;
    } else {
      window.location.href = `/${anime.data_id}`;
    }
  };


  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={isInView && { opacity: 1 }}
      transition={{ duration: 0.5, delay: props.delay, ease: easeOut }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="anime-card-wrapper"
    >
      <Link
        href={`${
          props.collectionName !== "Top Upcoming"
            ? localStorage.getItem(`Rewo-${anime.data_id}`)
              ? `/watch/${localStorage.getItem(`Rewo-${anime.data_id}`)}`
              : `/watchi/${anime.data_id}`
            : `/${anime.data_id}`
        }`}
        key={anime.data_id}
        className="anime-card d-flex"
        onClick={() => window.scrollTo({ top: 0 }) & startN()}
      >
        <div className={`anime-card-img-wrapper  `}>
          {screenWidth > 1150 && (
            <div
              style={isHovered ? { opacity: 1 } : { opacity: 0 }}
              className="img-blur d-flex a-center j-center trans-03"
            >
              <FaPlayCircle color="white" size={70} />{" "}
            </div>
          )}
          {props.keepIt || props.itsMe ? (
            anime.rating.includes("R") ? (
              <span className="rating">
                {anime.rating.includes("R") ? "18+" : ""}
              </span>
            ) : (
              ""
            )
          ) : anime.tvInfo.rating ? (
            <span className="rating">{anime.tvInfo.rating || ""}</span>
          ) : (
            ""
          )}
          <div className="tick-item">
            <span
              className={`episode-count ${
                anime?.tvInfo?.dub > 0 ? "borO" : "borR"
              }`}
            >
              <FaClosedCaptioning size={14} />
              {anime?.tvInfo?.sub || "?"}
            </span>{" "}
            {anime?.tvInfo?.dub > 0 ? (
              <span className="episode-count-dub d-flex a-center j-center">
                <AiFillAudio size={14} />
                {anime?.tvInfo?.dub || "?"}
              </span>
            ) : (
              ""
            )}
          </div>

          <LazyImage src={anime.poster} alt="anime-card" isAnimated={false} />
        </div>
        <div className="card-details">
          <span className="card-title">
            {anime.title?.length > 15
              ? anime.title?.slice(0, 15) + "..."
              : anime.title}
          </span>
          {props.keepIt ? (
            <div>
              <div className="card-statK">
                <div className="timoInfo">
                  <div className="epnt"><div>EP</div><div>{anime.epNo}</div></div>
                  <div className="durnt">
                    <div className="durntS">
                      {(minutestimo < 10
                        ? "0" + minutestimo.toString()
                        : minutestimo.toString()) +
                        ":" +
                        (secondstimo.toFixed(0) < 10
                          ? "0" + secondstimo.toFixed(0).toString()
                          : secondstimo.toFixed(0).toString())}
                    </div>
                    <div className="durntM">/</div>
                    <div className="durntL">
                      {(minutes < 10
                        ? "0" + minutes.toString()
                        : minutes.toString()) +
                        ":" +
                        (seconds.toFixed(0) < 10
                          ? "0" + seconds.toFixed(0).toString()
                          : seconds.toFixed(0).toString())}
                    </div>
                  </div>
                </div>
                <div className="scaling">
                  <div className={`inlino`} style={{ width: percentage }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-statistics">
              <span>
                {anime.tvInfo.duration === "Unknown"
                  ? `?`
                  : anime.tvInfo.duration.length > 7
                  ? anime.tvInfo.duration.slice(0, 7)
                  : anime.tvInfo.duration || "23m"}
              </span>
              <div className="dot"></div>
              <span>{anime.tvInfo.showtype || "TV"}</span>
            </div>
          )}
        </div>
      </Link>
      {screenWidth > 1150 && isHovered && anime && (
        <MouseOverCard id={anime.data_id} />
      )}
    </motion.div>
  );
}
