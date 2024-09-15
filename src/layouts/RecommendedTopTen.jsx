"use client";
import React, { useState } from "react";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import AnimeCollection from "../component/MainContainer/AnimeCollection";
import Genre from "@/component/Genre/Genre";
import Details from "@/component/AnimeInfo/AnimeInfoRandom";
import './recom.css'

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
      {props.doIt ? (
        ""
      ) : (
        <Details
          lata={getData}
          uiui={props.uiui}
          rand={props.rand}
          ShareUrl={props.ShareUrl}
          arise={props.arise}
          firstName={props.firstName}
        />
      )}

      <div
        className=" main-container jik d-flex"
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre data={props.data.genres} />
          <TopTenAnime data={props.data.top10Animes} />
        </div>
        <div
          className=" collections-wrapper jik d-flex  "
        >
          <AnimeCollection
            collectionName="Recommended for you"
            data={props.doIt ? props.datap?.recommendedAnimes : dlta}
            isInGrid={"true"}
          />
        </div>
      </div>
    </>
  );
}
