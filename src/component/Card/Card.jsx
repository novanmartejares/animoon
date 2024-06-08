"use client";
import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import Link from "next/link";
import MouseOverCard from "./MouseOverCard";
import { FaClosedCaptioning, FaPlayCircle } from "react-icons/fa";
import { easeOut, motion, useInView } from "framer-motion";
import LazyImage from "../../../../anito/src/utils/LazyImage";
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
          localStorage.getItem(`Rewo-${anime.id}`)
            ? `/watch/${localStorage.getItem(`Rewo-${anime.id}`)}`
            : `/watchi/${anime.id}`
        }`}
        key={anime.id}
        className="anime-card d-flex"
        onClick={() => window.scrollTo({ top: 0 })}
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
          {anime.rating ? (
            <span className="rating">{anime.rating || ""}</span>
          ) : (
            ""
          )}
          <div className="tick-item">
            <span
              className={`episode-count ${
                anime.episodes.dub ? "borO" : "borR"
              }`}
            >
              <FaClosedCaptioning size={14} />
              {anime.episodes.sub || "?"}
            </span>{" "}
            {anime.episodes.dub ? (
              <span className="episode-count-dub d-flex a-center j-center">
                <AiFillAudio size={14} />
                {anime.episodes.dub || "?"}
              </span>
            ) : (
              ""
            )}
          </div>

          <LazyImage src={anime.poster} alt="anime-card" isAnimated={false} />
        </div>
        <div className="card-details">
          <span className="card-title">
            {anime.name?.length > 18
              ? anime.name?.slice(0, 18) + "..."
              : anime.name}
          </span>
          <div className="card-statistics">
            <span>
              {anime.duration === "Unknown"
                ? `?`
                : anime.duration.length > 7
                ? anime.duration.slice(0, 7)
                : anime.duration || "23m"}
            </span>
            <div className="dot"></div>
            <span>{anime.type || "TV"}</span>
          </div>
        </div>
      </Link>
      {screenWidth > 1150 && isHovered && anime && (
        <MouseOverCard id={anime.id} />
      )}
    </motion.div>
  );
}
