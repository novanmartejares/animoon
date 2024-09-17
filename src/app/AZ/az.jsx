"use client";
import React, { useState } from "react";

import AnimeCollection from "@/component/MainContainer/AnimeCollectionJikan";

import "./az.css";
import LoadingSpinner from "@/component/loadingSpinner";

export default function SearchResults(props) {
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
        <div className="contA">
          <div className="collections-W">
            <AnimeCollection
              collectionName="Sort By Letters"
              IsLoading={IsLoading}
              data={props.el}
              sort={props.sort}
              page={props.page}
              para={props.para}
            />
          </div>
        </div>
      )}
    </>
  );
}
