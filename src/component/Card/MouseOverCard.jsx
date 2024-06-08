"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaPlayCircle, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "@/component/loadingSpinner";
import Link from "next/link";
import { FaEye, FaHeart, FaMedal } from "react-icons/fa";
import "./mouse-over-card.css";
import useAnime from "@/hooks/useAnime";

export default function MouseOverCard(props) {
  const { getAnimeInfo } = useAnime();
  const [hoverAnime, setHoverAnime] = useState(null);
  const fetchFub = async () => {
    const dat = await getAnimeInfo(props.id);
    console.log(dat);
    setHoverAnime(dat);
  };
  useEffect(()=>{
    fetchFub()
  },[])
  const anime = hoverAnime?.anime
  const ref = useRef(null);
  const genre = anime?.moreInfo?.genres?.map((genre,idx) => {
    return (
      <Link
        className="genre-button"
        key={idx}
        onClick={() => window.scrollTo({ top: 0 })}
        href={`/grid/genre?id=${genre}&name=${genre}`}
      >
        {genre}
      </Link>
    );
  });

  useEffect(() => {
    const cardRef = ref.current;
    if (ref.current) {
      cardRef.addEventListener("mouseenter", (event) => {
        event.stopPropagation();
      });
    }
  }, []);
  return (
    <div className="mouse-over-card-wrapper d-flex-fd-column" ref={ref}>
      {!hoverAnime ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="greatN">{anime?.info?.name || anime?.title_japanese}</h1>
          <div className="d-flex anime-st">
            <span className=" d-flex a-center j-center">
              <FaStar color="yellow" />
              {anime?.moreInfo?.malscore || "?"}
            </span>
            <div className="anime-statistics-tiles-wrapper d-flex a-center">
              <span className="anime-statistics-tile d-flex a-center j-center">
                {anime?.info?.stats?.rating
                  ? anime?.info?.stats?.rating?.length > 6
                    ? anime?.info?.stats?.rating.slice(0, 6)
                    : anime?.info?.stats?.rating
                  : "?" || "?"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                <FaMedal /> - {"NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                <FaHeart /> -{"NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                <FaEye /> -{"NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                {anime?.info?.stats?.quality}
              </span>
            </div>
            <span className="type">{anime?.info?.stats?.type || "?"}</span>
          </div>
          <p style={{ marginBottom: 0 }} className="description">
            {anime?.synopsis
              ? anime.info.description.length > 90
                ? anime.info.description.slice(0, 90) + "..."
                : anime.info.description
              : "?" || "?"}
          </p>
          <div
            style={{ marginBottom: 0, paddingBottom: 10 + "px" }}
            className="details-header-statistics"
          >
            <p>
              <b>Japanese:</b>{" "}
              {anime?.moreInfo.japanese
                ? anime.moreInfo.japanese.length > 20
                  ? anime.moreInfo.japanese.slice(0, 20) + "..."
                  : anime.moreInfo.japanese
                : "?" || "?"}
            </p>

            <p>
              <b>Aired:</b>
              {anime?.moreInfo.aired ? anime.moreInfo.aired : "?" || "?"}
            </p>

            <p>
              <b>Status:</b> {anime?.moreInfo.status || "?"}
            </p>
          </div>
          <div className="anime-st-genre">
            <p>
              <b>Genre: </b>
              {genre}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
