import React from "react";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Genre from "../Genre/Genre";

export default function MainSidebar(props) {
  return (
    <div className="d-flex-fd-column">
      <Genre isInNavbar={false} data={props.data.genres}/>
      <TopTenAnime data={props.data.top10Animes}/>
    </div>
  );
}