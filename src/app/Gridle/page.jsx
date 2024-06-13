"use client";
import React from "react";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Share from "@/component/Share/Share";
import LoadingSpinner from "@/component/loadingSpinner";
import AnimeCollection from "@/component/MainContainer/AnimeCollection";
export default function GenreSidebar(props) {
  return (
    <>
      <Share
        style={{
          paddingTop: 40,
          paddingBottom: 0,
          paddingInline: 20,
          marginTop: 80 + "px",
          marginBottom: 0,
        }}
      />
      <div
        className=" main-container d-flex  "
        style={
          window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
        }
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre data={props.datal}/>
          <TopTenAnime data={props.datal}/>
        </div>
        <div className="collections-wrapper">
          {!props.data ? (
            <LoadingSpinner />
          ) : (
            <AnimeCollection
              collectionName={props.fiki || props.name + ' Anime'}
              data={props.data.animes}
            />
          )}
        </div>
      </div>
    </>
  );
}
