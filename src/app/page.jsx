import React from "react";
import dynamic from "next/dynamic";
const DynamicHome = dynamic(() => import("@/app/home/home"), {
  ssr: false,
});

export default async function page() {
  const resp = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/home",
    { cache: "no-store" }
  );
  const data = await resp.json();

  // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

  const respa = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/top-airing?page=1",
    { cache: "no-store" }
  );
  const dataAiring = await respa.json();
  console.log(dataAiring);

  const respb = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/most-favorite?page=1",
    { cache: "no-store" }
  );
  const dataFavourite = await respb.json();
  console.log(dataFavourite);

  const respc = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/most-popular?page=1",
    { cache: "no-store" }
  );
  const dataPopular = await respc.json();
  console.log(dataPopular);

  const respd = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/completed?page=1",
    { cache: "no-store" }
  );
  const dataComp = await respd.json();
  console.log(dataComp);

  const respe = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/recently-updated?page=1",
    { cache: "no-store" }
  );
  const dataLatest = await respe.json();
  console.log(dataLatest);

  const respf = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/recently-added?page=1",
    { cache: "no-store" }
  );
  const dataNew = await respf.json();
  console.log(dataNew);

  const respg = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/top-upcoming?page=1",
    { cache: "no-store" }
  );
  const dataUpcoming = await respg.json();
  console.log(dataUpcoming);
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
