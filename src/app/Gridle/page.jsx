"use client";
import React, { useState } from "react";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Share from "@/component/Share/Share";
import "./gridle.css";
import AnimeCollection from "@/component/MainContainer/AnimeCollection";
import LoadingSpinner from "@/component/loadingSpinner";
export default function GenreSidebar(props) {
  const [isLoading, setIsLoading] = useState(false);
  const IsLoading = (data) => {
    if (data) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, [20000]);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Share
            style={{
              paddingTop: 40,
              paddingBottom: 0,
              paddingInline: 20,
              marginTop: 80 + "px",
              marginBottom: 0,
            }}
            ShareUrl={props.ShareUrl}
            arise={props.arise}
          />
          <div className=" main-container d-flex  ">
            <div className="sidebar-wrapper d-flex-fd-column">
              <Genre data={props.datal.genres} IsLoading={IsLoading} />
              <TopTenAnime
                data={props.datal.top10Animes}
                IsLoading={IsLoading}
              />
            </div>
            <div className="collections-wrapper">
              <AnimeCollection
                collectionName={props.fiki || props.name + " Anime"}
                filterName={props.cate}
                fiki={props.fiki}
                page={props.page}
                data={props.data.animes}
                IsLoading={IsLoading}
                totalPages={props.data.totalPages}
                isInGrid={"true"}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
