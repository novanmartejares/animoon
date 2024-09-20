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
      // Handle the case when localStorage is not available
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
    // Ensure this code runs on the client-side only
    if (typeof window !== "undefined") {
      // Set the initial screen width
      setScreenWidth(window.innerWidth);

      // Handle window resize event
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      // Attach the event listener
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  let totalSecondstimo = anime.Secds;

  // Calculate the minutes and remaining seconds
  let minutestimo = Math.floor(totalSecondstimo / 60) || 0;
  let secondstimo = totalSecondstimo % 60 || 0;

  let totalSeconds = anime.duration;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // Calculate the percentage
  function calculatePercentage(part, whole) {
    if (whole === 0) return 0;
    return (part / whole) * 100;
  }

  let percentage = calculatePercentage(totalSecondstimo, totalSeconds);

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
            anime.rating.includes("R") ? (
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
          <img src={anime.poster} alt="anime-card" />
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
                  <div className="durntS">
                    {`${minutestimo < 10 ? "0" + minutestimo : minutestimo}:${
                      secondstimo < 10 ? "0" + secondstimo : secondstimo
                    }`}
                  </div>
                  <div className="durntM">/</div>
                  <div className="durntL">
                    {`${minutes < 10 ? "0" + minutes : minutes}:${
                      seconds < 10 ? "0" + seconds : seconds
                    }`}
                  </div>
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
