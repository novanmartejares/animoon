import React from "react";
import dynamic from "next/dynamic";
const DynamicHome = dynamic(() => import("@/app/home/home"), {
  ssr: false,
});

export default async function page() {
  let data = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/home",
      { cache: "no-store" }
    );
    data = await resp.json();
  } catch (error) {
    data = []
  }


  // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"
  let dataAiring = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/top-airing?page=1",
      { cache: "no-store" }
    );
    dataAiring = await resp.json();
  } catch (error) {
    dataAiring = []
  }

  let dataFavourite = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/most-favorite?page=1",
      { cache: "no-store" }
    );
    dataFavourite = await resp.json();
  } catch (error) {
    dataFavourite = []
  }


  let dataPopular = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/most-popular?page=1",
      { cache: "no-store" }
    );
    dataPopular = await resp.json();
  } catch (error) {
    dataPopular = []
  }


  let dataComp = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/most-popular?page=1",
      { cache: "no-store" }
    );
    dataComp = await resp.json();
  } catch (error) {
    dataComp = []
  }

  let dataLatest = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/recently-updated?page=1",
      { cache: "no-store" }
    );
    dataLatest = await resp.json();
  } catch (error) {
    dataLatest = []
  }

  let dataNew = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/recently-added?page=1",
      { cache: "no-store" }
    );
    dataNew = await resp.json();
  } catch (error) {
    dataNew = []
  }

  let dataUpcoming = []
  try {
    const resp = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/top-upcoming?page=1",
      { cache: "no-store" }
    );
    dataUpcoming = await resp.json();
  } catch (error) {
    dataUpcoming = []
  }

  return (
    <div>
      <DynamicHome
        data={data}
        dataAiring={dataAiring}
        dataFavourite={dataFavourite}
        dataPopular={dataPopular}
        dataComp={dataComp}
        dataLatest={dataLatest}
        dataNew={dataNew}
        dataUpcoming={dataUpcoming}
      />
    </div>
  );
}
