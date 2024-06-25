"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./hero.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import LoadingSpinner from "../loadingSpinner";

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
import useAnime from "@/hooks/useAnime";
import { easeOut, motion } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
// configure Swiper to use modules
export default function Hero(props) {
  const [data, setData] = useState(props.data);
  let hour = props.hour;
  let min = props.min;
  let hours = props.hours;
  let minute = props.minute;

  const { getHome } = useAnime();
  let kat = null;
  const fetchLub = async () => {
    const dat = await getHome(hours, minute, hour, min);
    kat = dat;
    console.log(dat);
    if (dat.length > 0) {
      setData(dat);
    }
  };

  useEffect(() => {
    fetchLub();
  }, []);

  let item = [];

  const heroSlide =
    data?.spotlightAnimes &&
    data?.spotlightAnimes?.map((el, idx) => {
      const myArray = localStorage.getItem(`Rewatch-${el.id}`)
        ? localStorage.getItem(`Rewatch-${el.id}`).split(",")
        : [];
      const startN = () => {
        window.location.href = localStorage.getItem(`Rewo-${el.id}`)
          ? `/watch/${localStorage.getItem(`Rewo-${el.id}`)}`
          : `/watchi/${el.id}`;
      };
      const startD = () => {
        window.location.href = `/${el.id}`
      };
      item = el.name;

      return (
        <>
          <SwiperSlide data-bs-interval="4 00" key={el.id}>
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
                          <AiFillAudio size={14} />{" "}
                          {el.episodes.dub || "Unknown"}
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
                      onClick={() => window.scrollTo({ top: 0 }) & startN()}
                      href={
                        localStorage.getItem(`Rewo-${el.id}`)
                          ? `/watch/${localStorage.getItem(`Rewo-${el.id}`)}`
                          : `/watchi/${el.id}`
                      }
                      as={
                        localStorage.getItem(`Rewo-${el.id}`)
                          ? `/watch/${localStorage.getItem(`Rewo-${el.id}`)}`
                          : `/watchi/${el.id}`
                      }
                      className="btn-primary hero-button"
                      shallow
                    >
                      <FaPlayCircle size={12} /> Watch Now
                    </Link>
                    <Link
                      href={`/${el.id}`}
                      onClick={() => window.scrollTo({ top: 0 }) & startD()}
                      className="btn-secondary hero-button"
                      shallow
                    >
                      Details <FaChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
              <LazyImage
                className="carousel-img"
                src={
                  el.poster ||
                  item.posterImage?.large ||
                  item.posterImage?.small ||
                  item.posterImage?.medium
                }
                alt={el.name || item.titles.en}
                isAnimated={false}
              />
            </div>
          </SwiperSlide>
        </>
      );
    });

  return (
    <motion.div
      className="carousel slide"
      style={{ position: "relative" }}
      animate={{ y: [-window.innerHeight / 3, 10, 0] }}
      transition={{ duration: 1.3, ease: easeOut }}
    >
      {!data?.spotlightAnimes ? (
        <LoadingSpinner />
      ) : (
        <>
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
              className="carousel-controls carousel-control-next trans-03 "
              type="button"
            >
              <FaChevronRight size={15} />
            </button>
            <button
              className="carousel-controls carousel-control-prev trans-03  "
              type="button"
            >
              <FaChevronLeft size={15} />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
