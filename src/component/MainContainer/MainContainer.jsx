"use client";
import AnimeCollection from "./AnimeCollection";
import LoadingSpinner from "@/component/loadingSpinner";

import useAnime from "@/hooks/useAnime";

import MainSidebar from "./MainSidebar";
import { useEffect, useState } from "react";

export default function MainContainer(props) {
  const [ova, setOva] = useState(props.dataUpcoming);
  const [special, setSpecial] = useState(props.dataNew);
  const [movies, setMovies] = useState(props.dataLatest);
  let hour = props.hour;
  let min = props.min;
  let hours = props.hours;
  let minute = props.minute;
  const { getUpcoming, getLatestEpi, getNewAnime } = useAnime();

  const fetchGub = async () => {
    const dat = await getUpcoming(hour, min, hours, minute);
    console.log(dat);
    if (dat.length > 0) {
      setOva(dat);
    }
  };
  const fetchBub = async () => {
    const dat = await getLatestEpi(hour, min, hours, minute);
    console.log(dat);
    if (dat.length > 0) {
      setMovies(dat);
    }
  };
  const fetchTub = async () => {
    const dat = await getNewAnime(hour, min, hours, minute);
    console.log(dat);
    if (dat.length > 0) {
      setSpecial(dat);
    }
  };
  useEffect(() => {
    fetchGub();
    fetchBub();
    fetchTub();
  }, []);

  return (
    <div className="main-container d-flex">
      {ova && special && movies ? (
        <>
          <div className="sidebar-wrapper">
            <MainSidebar
              hours={hours}
              minute={minute}
              hour={hour}
              min={min}
              data={props.data}
            />
          </div>
          <div className="collections-wrapper d-flex-fd-column a-center ">
            <AnimeCollection
              collectionName="Latest Episodes"
              data={movies?.animes?.slice(0, 12)}
            />
            <AnimeCollection
              collectionName="New on Animoon"
              data={special?.animes?.slice(0, 12)}
            />
            <AnimeCollection
              collectionName="Top Upcoming"
              data={ova?.animes?.slice(0, 12)}
            />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
