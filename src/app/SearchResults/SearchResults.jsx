"use client";
import React from "react";
import AnimeCollection from "@/component/MainContainer/AnimeCollection";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import Error from "@/component/AnimeNotFound/Error";
import "./seara.css";
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
        <div className=" main-container d-flex  ">
          <div className="sidebar-wrapper d-flex-fd-column">
            <Genre data={props.datal} IsLoading={IsLoading} />
            <TopTenAnime data={props.datal} IsLoading={IsLoading} />
          </div>
          <div className="collections-wrapper">
            {props.data?.animes?.length < 1 ? (
              <Error />
            ) : (
              <AnimeCollection
                collectionName="Search Results"
                data={props.data?.animes}
                IsLoading={IsLoading}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
