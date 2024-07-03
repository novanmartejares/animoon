"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/component/loadingSpinner";
import "./AnimeInfo.css";
import Link from "next/link";
import {
  FaClosedCaptioning,
  FaEye,
  FaHeart,
  FaMedal,
  FaPlayCircle,
  FaPlus,
} from "react-icons/fa";
import Share from "../Share/Share";
import useAnime from "@/hooks/useAnime";
import Image from "next/image";
import { AiFillAudio } from "react-icons/ai";
import { useRouter } from "next/navigation";
export default function Details(props) {
  let [counter, setCounter] = useState(0);
  const Router = useRouter();

  // Function is called everytime increment button is clicked
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };
  let y = [];
  let x = counter;

  let j = y.concat(x);
  console.log("YY", j);

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
      >
        {genre}
      </Link>
    );
  });

  const producers = gnt?.moreInfo?.producers?.map((producer) => {
    return (
      <Link key={producer} href={`/producer?name=${producer}`}>
        {producer + ", "}
      </Link>
    );
  });

  const studios = gnt?.moreInfo?.studios;

  const synonyms = gnt?.info.name;
  const details = () => {
    if (props.rand) {
      window.location.href = `/${gnt.info.id}`;
    } else {
      Router.push("/working");
    }
  };

  const vv = counter < 19 ? counter : (counter = 0);
  const startN = () => {
    window.location.href = localStorage.getItem(`Rewo-${gnt.info.id}`)
      ? `/watch/${localStorage.getItem(`Rewo-${gnt.info.id}`)}`
      : `/watchi/${gnt.info.id}`;
  };
  return gnt?.info?.poster ? (
    <div className="details-container">
      <div className="details-header">
        <div className="details-header-primary">
          <img
            className="details-container-background"
            src={gnt?.info?.poster || "NA"}
            alt="pop"
            isAnimated={false}
          />
          <Link
            href={{
              pathname: `/random?rand=${
                counter < 18 ? counter : (counter = 0)
              }`,
            }}
            as={`/random?rand=${counter < 18 ? counter : (counter = 0)}`}
            className="btn-tertiary"
          >
            <h1 onClick={handleClick1} className="GomenGomen">
              Randomize
            </h1>
          </Link>
          <div className="anime-details d-flex">
            <img
              className="anime-details-poster"
              src={gnt?.info?.poster ? gnt?.info?.poster : ""}
              alt="pop"
              isAnimated={false}
            />

            <div className="anime-details-content d-flex-fd-column">
              <div className="flex gap-1 items-center specif">
                <Link href={"/"}>
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
                  {" "}
                  <div className="rat">{gnt.info.stats.rating}</div>
                  <div className="qual">{gnt.info.stats.quality}</div>
                  <div className="subE">
                    <FaClosedCaptioning size={14} />{" "}
                    {gnt.info.stats.episodes.sub || "Unknown"}
                  </div>
                  {gnt.info.stats.episodes.dub ? (
                    <div className="dubE">
                      {" "}
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
                    localStorage.getItem(`Rewo-${gnt.info.id}`)
                      ? `/watch/${localStorage.getItem(`Rewo-${gnt.info.id}`)}`
                      : `/watchi/${gnt.info.id}`
                  }`}
                  className="btn-primary hero-button"
                  onClick={() => startN()}
                >
                  <FaPlayCircle size={12} /> Watch Now
                </Link>
                <button
                  className="btn-secondary  hero-button"
                  onClick={() => details()}
                >
                  {props.rand ? "Details" : "Add to List"}
                  <FaPlus size={12} />
                </button>
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
                AniMoon is the best site to watch {gnt.info.name} SUB online, or
                you can even watch {gnt.info.name} DUB in HD quality. You can
                also find {gnt.moreInfo.studios} anime on AniMoon website.
              </p>
              <Share style={{ padding: 0, margin: 0 }} ShareUrl={props.ShareUrl} arise={props.arise}/>
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
          <div className="details-header-studio">
            <p>
              <b>Producers: </b>
              {producers}
            </p>
            <p>
              <b>Studios: </b>
              <Link href={`/producer?name=${gnt.moreInfo.studios}`}>
                {studios}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}
