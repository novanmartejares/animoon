"use client";
import React, { useState } from "react";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import AnimeCollection from "../component/MainContainer/AnimeCollection";
import Genre from "@/component/Genre/Genre";
import Details from "@/component/AnimeInfo/AnimeInfoRandom";
import LoadingSpinner from "@/component/loadingSpinner";
import { easeOut, motion } from "framer-motion";
export default function RecommendedTopTen(props) {
  const [dlta, setDlta] = useState([]);
  const getData = (data) => {
    console.log("API DATA IS HERE", data);
    setDlta(data);
    return data;
  };
  if (dlta) {
    console.log("ANIME", dlta);
  }

  return (
    <>
      {props.doIt ? "" : <Details lata={getData} uiui={props.uiui} />}

      <motion.div
        className=" main-container d-flex"
        initial={{ opacity: 0 }}
        animate={{ x: [window.innerWidth, 0], opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        style={
          window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
        }
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre />
          <TopTenAnime />
        </div>
        <div
          className=" collections-wrapper d-flex  "
          style={
            window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
          }
        >
          {(props.doIt ? !(props?.datap?.recommendedAnimes) : !(dlta && dlta.length > 0)) ? (
            <LoadingSpinner />
          ) : (
            <AnimeCollection collectionName="Recommended for you" data={props.doIt ? props.datap?.recommendedAnimes : dlta} />
          )}
        </div>
      </motion.div>
    </>
  );
}
