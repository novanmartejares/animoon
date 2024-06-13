"use client";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/component/loadingSpinner";
import ContentList from "./ContentList";
import useAnime from "@/hooks/useAnime";

export default function Featured(props) {
  const [upcoming, setUpcoming] = useState(props.dataComp);
  let hour = props.hour
  let min = props.min
  let hours = props.hours
  let minute = props.minute
  const { getTopUpcoming, getTopAiring, getTopFavorite, getTopPopular } =
    useAnime();
  const fetchPub = async () => {
    const dat = await getTopUpcoming(hours,minute,hour,min);
    console.log(dat);
    if (dat.length > 0) {
      setUpcoming(dat);
    }
  };

  const [airing, setAiring] = useState(props.dataAiring);
  const fetchFub = async () => {
    const dat = await getTopAiring(hours,minute,hour,min);
    console.log(dat);
    if (dat.length > 0) {
      setAiring(dat);
    }
  };

  const [popular, setPopular] = useState(props.dataPopular);
  const fetchCub = async () => {
    const dat = await getTopPopular(hours,minute,hour,min);
    console.log(dat);
    if (dat.length > 0) {
      setPopular(dat);
    }
  };

  const [favorite, setFavorite] = useState(props.dataFavourite);
  const fetchXub = async () => {
    const dat = await getTopFavorite(hours,minute,hour,min);
    console.log(dat);
    if (dat.length > 0) {
      setFavorite(dat);
    }
  };

  useEffect(() => {
    fetchXub();
    fetchFub();
    fetchPub();
    fetchCub();
  }, []);

  return !(airing && favorite && popular && upcoming) ? (
    <LoadingSpinner />
  ) : (
    <div className="featured-container d-flex">
      <ContentList
        heading="Top Airing"
        data={airing?.animes?.slice(0,5)}
        filterName="top-airing"
      />
      <ContentList
        heading="Most Popular"
        data={popular?.animes?.slice(0,5)}
        filterName="most-popular"
      />
      <ContentList
        heading="Most Favorite"
        data={favorite?.animes?.slice(0,5)}
        filterName="most-favorite"
      />
      <ContentList
        heading="Latest Completed"
        data={upcoming?.animes?.slice(0,5)}
        filterName="completed"
      />
    </div>
  );
}
