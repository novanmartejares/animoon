import React from "react";
import ContentList from "./ContentList";

export default function Featured(props) {
  return (
    <div className="featured-container d-flex">
      <ContentList
        heading="Top Airing"
        data={props.data.topAiringAnimes?.slice(0, 5)}
        filterName="top-airing"
      />
      <ContentList
        heading="Most Popular"
        data={props.data.mostPopularAnimes?.slice(0, 5)}
        filterName="most-popular"
      />
      <ContentList
        heading="Most Favorite"
        data={props.data.mostFavoriteAnimes?.slice(0, 5)}
        filterName="most-favorite"
      />
      <ContentList
        heading="Latest Completed"
        data={props.data.latestCompletedAnimes?.slice(0, 5)}
        filterName="completed"
      />
    </div>
  );
}
