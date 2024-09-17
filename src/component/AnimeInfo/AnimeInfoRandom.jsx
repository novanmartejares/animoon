"use client";
import React, { useEffect, useState, useRef } from "react";
import LoadingSpinner from "@/component/loadingSpinner";
import "./AnimeInfo.css";
import Link from "next/link";
import { FaClosedCaptioning, FaPlayCircle, FaPlus } from "react-icons/fa";
import Share from "../Share/Share";
import useAnime from "@/hooks/useAnime";
import { AiFillAudio } from "react-icons/ai";

export default function Details(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const handleNavigation = () => {
    props.IsLoading(true);
  };

  const handleOptionClick = (option) => {
    if (!props.firstName) {
      window.location.href = "/user/watch-list";
    }
    console.log(`Selected option: ${option}`);
    setIsOpen(false); // Close the dropdown after selection

    // Create a new object with the selected data and timestamp
    const newObj = {
      id: props.uiui.anime.info.id,
      poster: props.uiui.anime.info.poster,
      duration: props.uiui.anime.info.stats.duration,
      rating: props.uiui.anime.info.stats.rating,
      episodes: {
        sub: props.uiui.anime.info.stats.episodes.sub,
        dub: props.uiui.anime.info.stats.episodes.dub,
      },
      name: props.uiui.anime.info.name,
      timestamp: new Date().toISOString(), // Add current time in ISO format
    };

    // Define option keys
    const options = [
      "Watching",
      "On-Hold",
      "Plan to Watch",
      "Dropped",
      "Completed",
    ];

    // Remove the entry from all options' local storage if it exists
    options.forEach((opt) => {
      const key = `animeData_${opt}`;
      let data = JSON.parse(localStorage.getItem(key)) || [];
      data = data.filter((item) => item.id !== newObj.id);
      localStorage.setItem(key, JSON.stringify(data));
    });

    // Create dynamic key for the current option
    const currentKey = `animeData_${option}`;

    // Retrieve existing data from local storage for the current option
    let currentData = JSON.parse(localStorage.getItem(currentKey)) || [];

    // Check if the id already exists in the current option's data
    const index = currentData.findIndex((item) => item.id === newObj.id);

    if (index !== -1) {
      // Update existing entry if it exists
      currentData[index] = newObj;
    } else {
      // Add new entry if it does not already exist
      currentData.push(newObj);
    }

    // Store the updated current data back to local storage
    localStorage.setItem(currentKey, JSON.stringify(currentData));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const gnt = props.uiui?.anime;
  if (props.uiui) {
    props.lata(props?.uiui?.recommendedAnimes);
  }

  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const genre = gnt?.moreInfo?.genres?.map((genre) => {
    return (
      <Link
        className="genre-button"
        key={genre}
        href={`/genre?id=${genre}&name=${genre}`}
        onClick={handleNavigation}
      >
        {genre}
      </Link>
    );
  });

  const producers = gnt?.moreInfo?.producers?.map((producer) => {
    return (
      <Link
        key={producer}
        href={`/producer?name=${producer}`}
        onClick={handleNavigation}
      >
        {producer + ", "}
      </Link>
    );
  });

  const studios = gnt?.moreInfo?.studios;
  const synonyms = gnt?.info.name;

  return (
    <div className="details-container">
      <div className="details-header">
        <div className="details-header-primary">
          <img
            className="details-container-background"
            src={gnt?.info?.poster || "NA"}
            alt="pop"
            isAnimated={false}
          />
          <div className="anime-details d-flex">
            <img
              className="anime-details-poster"
              src={gnt?.info?.poster ? gnt?.info?.poster : ""}
              alt="pop"
              isAnimated={false}
            />

            <div className="anime-details-content d-flex-fd-column">
              <div className="flex gap-1 items-center specif">
                <Link href={"/"} onClick={handleNavigation}>
                  <div className="homo">Home</div>
                </Link>
                <div className="dotoi">&#x2022;</div>
                <div className="homo">{gnt.info.stats.type}</div>
                <div className="doto">&#x2022;</div>
                <div className="namo">{gnt?.info?.name}</div>
              </div>
              <h1 className="title-large">{gnt?.info?.name}</h1>

              <div className="flex gap-1 items-center">
                <div className="flex gap-1">
                  <div className="rat">{gnt.info.stats.rating}</div>
                  <div className="qual">{gnt.info.stats.quality}</div>
                  <div className="subE">
                    <FaClosedCaptioning size={14} />{" "}
                    {gnt.info.stats.episodes.sub || "Unknown"}
                  </div>
                  {gnt.info.stats.episodes.dub ? (
                    <div className="dubE">
                      <AiFillAudio size={14} />{" "}
                      {gnt.info.stats.episodes.dub || "Unknown"}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="dotoi">&#x2022;</div>
                <div className="typo">{gnt.info.stats.type}</div>
                <div className="doto">&#x2022;</div>
                <div className="duran">{gnt.moreInfo.duration}</div>
              </div>
              <div className="button-wrapper">
                <Link
                  href={`${
                    ls.getItem(`Rewo-${gnt.info.id}`)
                      ? `/watch/${ls.getItem(`Rewo-${gnt.info.id}`)}`
                      : `/watchi/${gnt.info.id}`
                  }`}
                  className="btn-primary hero-button"
                  onClick={handleNavigation}
                >
                  <FaPlayCircle size={12} /> Watch Now
                </Link>
                <div className="dropdown-container" ref={dropdownRef}>
                  <button
                    className="btn-secondary hero-button"
                    onClick={() => {
                      toggleDropdown();
                    }}
                  >
                    {props.rand ? "Details" : "Add to List"}
                    <FaPlus size={12} />
                  </button>
                  {isOpen && (
                    <ul className="dropdown-menu">
                      {[
                        "Watching",
                        "On-Hold",
                        "Plan to Watch",
                        "Dropped",
                        "Completed",
                      ].map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <p>
                {descIsCollapsed
                  ? gnt?.info?.description?.slice(0, 350) + "..."
                  : gnt?.info?.description}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setDescIsCollapsed((prev) => !prev)}
                >
                  [ {descIsCollapsed ? "More" : "Less"} ]
                </span>
              </p>
              <p>
                Animoon is the best site to watch {gnt.info.name} SUB online, or
                you can even watch {gnt.info.name} DUB in HD quality. You can
                also find {gnt.moreInfo.studios} anime on Animoon website.
              </p>
              <Share
                style={{ padding: 0, margin: 0 }}
                ShareUrl={props.ShareUrl}
                arise={props.arise}
              />
            </div>
          </div>
        </div>

        <div className="details-header-secondary">
          <div className="details-header-statistics">
            <p>
              <b>Japanese:</b> {gnt?.moreInfo?.japanese}
            </p>
            <p>
              <b>Synonyms:</b>{" "}
              {gnt?.moreInfo?.synonyms
                ? gnt?.moreInfo?.synonyms?.length > 0
                  ? synonyms
                  : "N/A"
                : ""}
            </p>
            <p>
              <b>Aired:</b>
              {gnt?.moreInfo?.aired || "?"}
            </p>
            <p>
              <b>Duration:</b> {gnt?.moreInfo?.duration || "NA"}
            </p>
            <p>
              <b>Score:</b> {gnt?.moreInfo?.malscore}
            </p>
            <p>
              <b>Status:</b> {gnt?.moreInfo?.status}
            </p>
            <p>
              <b>Premiered:</b> {gnt?.moreInfo?.premiered || "Season: ?" + " "}
            </p>
          </div>
          <div className="details-header-genre">
            <p>
              <b>Genre: </b>
              {genre}
            </p>
          </div>
          <p>
            <b>Producers:</b>
            {producers}
          </p>
          <p>
            <b>Studios:</b>
            {studios}
          </p>
        </div>
      </div>
    </div>
  );
}
