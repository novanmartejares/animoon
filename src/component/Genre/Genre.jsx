"use client";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/component/loadingSpinner";
import "./genre.css";
import Link from "next/link";
import { easeOut, motion } from "framer-motion";
import useAnimationOnce from "@/hooks/useAnimationOnce";
import useAnime from "@/hooks/useAnime";
export default function Genre(props) {
  const { getHome } = useAnime();
  const [genree, setGenree] = useState(null);
  let hour = props.hour
  let min = props.min
  let hours = props.hours
  let minute = props.minute
  const fetchFub = async () => {
    const dat = await getHome(hours,minute,hour,min);
    console.log(dat);
    setGenree(dat.genres);
  };
  useEffect(()=>{
    fetchFub()
  },[])
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef(null);
  const containerInView = useAnimationOnce(containerRef);
  const list = isCollapsed ? genree?.slice(0, 18) : genree;

  const genreList = list?.map((el, idx) => {
    return (
      <Link
        key={idx}
        href={`/genre?id=${el}&name=${el}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={containerInView && { opacity: 1, x: ["100%", "-10%", "0%"] }}
          transition={{ duration: 0.5 }}
        >
          {el}
        </motion.div>
      </Link>
    );
  });

  return (
    <motion.div
      ref={containerRef}
      className="genre-wrapper "
      initial={{ opacity: 0 }}
      animate={containerInView && { x: ["50%", "-10%", "0%"], opacity: 1 }}
      transition={{ ease: easeOut, duration: 0.4 }}
    >
      <h2>Genre</h2>
      {!genree ? (
        <LoadingSpinner />
      ) : (
        <div className="genre-list d-flex a-center j-center" style={{}}>
          {genreList}

          <button
            className="f-poppins trans-03"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? "Show More" : "Show Less"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
