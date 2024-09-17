"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./hero.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaPlayCircle,
  FaClosedCaptioning,
} from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

export default function Hero(props) {
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    // Retrieve all relevant localStorage data
    const storageData = {};
    props.data?.forEach((el) => {
      storageData[el.id] = localStorage.getItem(`Rewo-${el.id}`);
    });
    setLocalStorageData(storageData);
  }, [props.data]);

  const handleNavigation = () => {
    props.IsLoading(true);
  };

  const heroSlide =
    props.data &&
    props.data.map((el) => {
      const storedId = localStorageData[el.id];

      return (
        <SwiperSlide key={el.id}>
          <div className={`carousel-item after:top-0 after:right-0`}>
            <div className="anime-info">
              <div className="anime-info-content">
                <span className="rank">#{el.rank} Spotlight</span>
                <h1 className="anime-title">
                  {el.name.length < 58
                    ? el.name
                    : el.name.slice(0, 58) + "..." || item.titles.en_jp}
                </h1>
                <div className="anime-statistics">
                  <span className="anime-st-item">
                    <FaPlayCircle size={14} />
                    {el.otherInfo[0]}
                  </span>
                  <span className="anime-st-item">
                    <FaClock size={14} />
                    {el.otherInfo[1]}
                  </span>
                  <span className="anime-st-item">
                    <FaCalendar size={13} /> {el.otherInfo[2]}
                  </span>
                  <span className="anime-st-item">
                    <span className="quality">HD</span>
                    <span className="episode-count">
                      <FaClosedCaptioning size={14} />{" "}
                      {el.episodes.sub || "Unknown"}
                    </span>
                    {el.episodes.dub ? (
                      <span className="episode-count-dub">
                        <AiFillAudio size={14} /> {el.episodes.dub || "Unknown"}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <p className="description">
                  {(el.description && el.description.slice(0, 200) + "...") ||
                    (item.synopsis && item.synopsis.slice(0, 200) + "...")}
                </p>
                <div className="button-wrapper">
                  <Link
                    href={storedId ? `/watch/${storedId}` : `/watchi/${el.id}`}
                    className="btn-primary hero-button"
                    onClick={handleNavigation} // Show loading indicator on click
                  >
                    <FaPlayCircle size={12} /> Watch Now
                  </Link>
                  <Link
                    href={`/${el.id}`}
                    className="btn-secondary hero-button"
                    onClick={handleNavigation} // Show loading indicator on click
                  >
                    Details <FaChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
            <img className="carousel-img" src={el.poster} alt={el.name} />
          </div>
        </SwiperSlide>
      );
    });

  return (
    <>
      <div className="carousel slide" style={{ position: "relative" }}>
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          direction="horizontal"
          loop={true}
          autoplay={true}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            nextEl: ".carousel-control-next",
            prevEl: ".carousel-control-prev",
          }}
          className="carousel slide"
        >
          {heroSlide}
        </Swiper>
        <div className="carousel-controls-wrapper">
          <button
            className="carousel-controls carousel-control-next trans-03"
            type="button"
          >
            <FaChevronRight size={15} />
          </button>
          <button
            className="carousel-controls carousel-control-prev trans-03"
            type="button"
          >
            <FaChevronLeft size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
