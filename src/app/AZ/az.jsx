import React from "react";

import AnimeCollection from "@/component/MainContainer/AnimeCollectionJikan";

import "./az.css";

export default function SearchResults(props) {
  return (
    <div
      className="contA"
    >
      <div className="collections-W">
        <AnimeCollection
          collectionName="Sort By Letters"
          data={props.el}
          sort={props.sort}
          page={props.page}
          para={props.para}
        />
      </div>
    </div>
  );
}
