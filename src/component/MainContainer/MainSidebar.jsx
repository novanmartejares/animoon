import React from "react";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Genre from "../Genre/Genre";

export default function MainSidebar(props) {
  return (
    <div className="d-flex-fd-column">
      <Genre isInNavbar={false} data={props.data.genres} IsLoading={props.IsLoading}/>
      <TopTenAnime data={props.data.top10Animes} IsLoading={props.IsLoading}/>
    </div>
  );
}