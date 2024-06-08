'use client'
import AnimeCollection from "./AnimeCollection";
import LoadingSpinner from "@/component/loadingSpinner";

import useAnime from "@/hooks/useAnime";

import MainSidebar from "./MainSidebar";
import { useEffect, useState } from "react";

export default function MainContainer(props) {
  const [ona, setOna] = useState(null);
  const [ova, setOva] = useState(null);
  const [special, setSpecial] = useState(null);
  const [movies, setMovies] = useState(null);
  let hour = props.hour
  let min = props.min
  let hours = props.hours
  let minute = props.minute
  const { getTopOna, getUpcoming, getLatestEpi, getNewAnime } = useAnime();
  const fetchPub = async () => {
    const dat = await getTopOna(hour,min,hours,minute);
    console.log(dat);
    setOna(dat);
  };
  const fetchGub = async () => {
    const dat = await getUpcoming(hour,min,hours,minute);
    console.log(dat);
    setOva(dat);
  };
  const fetchBub = async () => {
    const dat = await getLatestEpi(hour,min,hours,minute);
    console.log(dat);
    setMovies(dat);
  };
  const fetchTub = async () => {
    const dat = await getNewAnime(hour,min,hours,minute);
    console.log(dat);
    setSpecial(dat);
  };
  useEffect(() => {
    fetchPub();
    fetchGub();
    fetchBub();
    fetchTub();
  },[]);

  return (
    <div className="main-container d-flex">
      {(ova && ona && special && movies) ? (
        <>
          <div className="sidebar-wrapper">
            <MainSidebar hours={hours} minute={minute} hour={hour} min={min}/>
          </div>
          <div className="collections-wrapper d-flex-fd-column a-center ">
            <AnimeCollection collectionName="Latest Episodes" data={movies?.animes?.slice(0,12)} />
            <AnimeCollection collectionName="New on Animoon" data={special?.animes?.slice(0,12)} />
            <AnimeCollection collectionName="Top Upcoming" data={ova?.animes?.slice(0,12)} />
            <AnimeCollection collectionName="Top ONA's" data={ona?.animes?.slice(0,12)} />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
