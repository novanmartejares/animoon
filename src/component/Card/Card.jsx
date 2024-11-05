"use client";
import React, { useEffect, useState } from "react";
import "./card.css";
import Link from "next/link";
import MouseOverCard from "./MouseOverCard";
import { FaClosedCaptioning, FaPlayCircle } from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import Image from "next/image";

export default function Card(props) {
  const anime = props.data;
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const localStorageWrapper = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
      };
    } else {
      return {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      };
    }
  };

  // Usage
  const ls = localStorageWrapper();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Assuming 'anime.Secds' is the number of seconds watched so far
  let totalSecondstimo = anime.Secds || 0;

  // Calculate the minutes and remaining seconds for watched time
  let minutestimo = Math.floor(totalSecondstimo / 60);
  let secondstimo = totalSecondstimo % 60;

  // Assuming 'anime.duration' is the total duration in seconds
  let totalSeconds = anime.duration || 0;

  // Calculate the minutes and remaining seconds for total duration
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutestimo = parseFloat(minutestimo.toFixed(0));
  secondstimo = parseFloat(secondstimo.toFixed(0));
  minutes = parseFloat(minutes.toFixed(0));
  seconds = parseFloat(seconds.toFixed(0));

  // Function to calculate percentage of time watched
  function calculatePercentage(part, whole) {
    if (whole === 0) return 0;
    return (part / whole) * 100;
  }

  // Calculate the percentage of the video watched
  let percentage = calculatePercentage(totalSecondstimo, totalSeconds);

  // Format time values to be two digits (e.g., 01:05)
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Output time in two-digit format
  const watchedTime = `${formatTime(minutestimo)}:${formatTime(secondstimo)}`;
  const totalTime = `${formatTime(minutes)}:${formatTime(seconds)}`;

  const handleNavigation = () => {
    props.IsLoading(true);
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="anime-card-wrapper"
    >
      <Link
        href={`${
          props.collectionName !== "Top Upcoming"
            ? ls.getItem(`Rewo-${anime.id}`)
              ? `/watch/${ls.getItem(`Rewo-${anime.id}`)}`
              : `/watch/${anime.id}`
            : `/${anime.id}`
        }`}
        prefetch
        onClick={handleNavigation}
        key={anime.id}
        className="anime-card d-flex"
      >
        <div className="anime-card-img-wrapper">
          {screenWidth > 1150 && (
            <div
              style={isHovered ? { opacity: 1 } : { opacity: 0 }}
              className="img-blur d-flex a-center j-center trans-03"
            >
              <FaPlayCircle color="white" size={70} />
            </div>
          )}
          {props.keepIt || props.itsMe ? (
            anime.rating?.includes("R") ? (
              <span className="rating">18+</span>
            ) : (
              ""
            )
          ) : anime.rating ? (
            <span className="rating">{anime.rating}</span>
          ) : (
            ""
          )}
          <div className="tick-item">
            <span
              className={`episode-count ${
                anime?.episodes?.dub > 0 ? "borO" : "borR"
              }`}
            >
              <FaClosedCaptioning size={14} />
              {anime?.episodes?.sub || "?"}
            </span>
            {anime?.episodes?.dub > 0 && (
              <span className="episode-count-dub d-flex a-center j-center">
                <AiFillAudio size={14} />
                {anime?.episodes?.dub || "?"}
              </span>
            )}
          </div>
          <img src={anime.poster} alt="anime-card" className="anime-card-img" />
        </div>
        <div className="card-details">
          <span className="card-title">
            {anime.name?.length > 15
              ? anime.name.slice(0, 15) + "..."
              : anime.name}
          </span>
          {props.keepIt ? (
            <div className="card-statK">
              <div className="timoInfo">
                <div className="epnt">
                  <div>EP</div>
                  <div>{anime.epNo}</div>
                </div>
                <div className="durnt">
                  <div className="durntS">{watchedTime}</div>
                  <div className="durntM">/</div>
                  <div className="durntL">{totalTime}</div>
                </div>
              </div>
              <div className="scaling">
                <div
                  className="inlino"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="card-statistics">
              <span>
                {anime.duration === "Unknown"
                  ? "?"
                  : anime.duration.length > 7
                  ? anime.duration.slice(0, 7)
                  : anime.duration || "23m"}
              </span>
              <div className="dot"></div>
              <span>{anime.type || "TV"}</span>
            </div>
          )}
        </div>
      </Link>
      {screenWidth > 1150 && isHovered && anime && (
        <MouseOverCard id={anime.id} />
      )}
    </div>
  );
}
