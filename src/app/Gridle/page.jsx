import React from "react";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Share from "@/component/Share/Share";
import './gridle.css'
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
        ShareUrl={props.ShareUrl}
        arise={props.arise}
      />
      <div
        className=" main-container d-flex  "
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre data={props.datal.genres} />
          <TopTenAnime data={props.datal.top10Animes} />
        </div>
        <div className="collections-wrapper">
          <AnimeCollection
            collectionName={props.fiki || props.name + " Anime"}
            filterName={props.cate}
            fiki={props.fiki}
            page={props.page}
            data={props.data.animes}
            totalPages={props.data.totalPages}
            isInGrid={"true"}
          />
        </div>
      </div>
    </>
  );
}
