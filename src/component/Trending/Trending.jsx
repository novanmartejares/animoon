"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./trending.css";
import Link from "next/link";
import { easeOut, motion, useInView } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
import useAnime from "@/hooks/useAnime";
export default function Trending(props) {
  const [data, setData] = useState(null);
  let hour = props.hour
  let min = props.min
  let hours = props.hours
  let minute = props.minute
  const { getHome } = useAnime();
  const fetchLub = async () => {
    const dat = await getHome(hour,min,hours,minute);
    console.log(dat);
    setData(dat.trendingAnimes);
  };
  useEffect(() => {
    fetchLub();
  },[]);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const animeCard = data?.map((el, idx) => {
    const item = el.id;
    const title = el.name || item.titles.en_jp;

    return (
      <SwiperSlide key={el.id} className="trending-slide">
        <div
          initial={{ opacity: 0 }}
          animate={isInView ? { x: [100, 10, 0], opacity: 1 } : undefined}
          transition={{
            duration: 0.2,
            delay: idx * 0.1 + 1.2,
            ease: easeOut,
          }}
        >
          <motion.div
            className="trending-item-sidebar"
            initial={{ opacity: 0 }}
            animate={isInView && { x: [100, 10, 0], opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: idx * 0.12 + 1.2,
              ease: easeOut,
            }}
          >
            <p className="f-poppins">
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </p>
            <span>{el.rank > 9 ? el.rank : "0" + (el.rank)}</span>
          </motion.div>
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            href={`${localStorage.getItem(`Rewo-${el.id}`) ? `/watch/${localStorage.getItem(`Rewo-${el.id}`)}` : `watchi/${el.id}`}`}
          >
            <LazyImage
              initial={{ opacity: 0 }}
              animate={isInView && { x: [100, 10, 0], opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: idx * 0.15,
                ease: easeOut,
              }}
              src={el.poster}
              className="trending-slide-img"
              alt={title}
              isAnimated={true}
            />
          </Link>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <div className="trending-section-wrapper" ref={ref}>
      <h1 className="section-header">Trending</h1>
      <Swiper
        className="swiper"
        modules={[Navigation]}
        breakpoints={{
          1700: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
          1600: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1450: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 4,
          },
          200: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={5}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".btn-nextTwo",
          prevEl: ".btn-prevTwo",
        }}
      >
        {animeCard}
        <div className="trending-swiper-navigation trans-c-03">
          <div className="btn-nextTwo swiper-controls d-flex a-center j-center">
            <FaChevronRight size={20} />
          </div>
          <div className="btn-prevTwo swiper-controls  d-flex a-center j-center">
            <FaChevronLeft size={20} />
          </div>
        </div>
      </Swiper>
    </div>
  );
}
