"use client";
import React from "react";
import AnimeCollection from "@/component/MainContainer/AnimeCollection";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Error from "@/component/AnimeNotFound/Error";
import "./seara.css";
export default function SearchResults(props) {
  return (
    <div className=" main-container d-flex  ">
      <div className="sidebar-wrapper d-flex-fd-column">
        <Genre data={props.datal} />
        <TopTenAnime data={props.datal} />
      </div>
      <div className="collections-wrapper">
        {props.data?.animes?.length < 1 ? (
          <Error />
        ) : (
          <AnimeCollection
            collectionName="Search Results"
            data={props.data?.animes}
          />
        )}
      </div>
    </div>
  );
}
