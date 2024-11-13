import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
// import { currentUser } from "@clerk/nextjs/server";

// Helper function to fetch data with force-cache and revalidate options
async function fetchDataFromAPI(url, revalidate) {
  try {
    const response = await fetch(url, {
      cache: "force-cache", // Cache the response forcefully
      next: { revalidate },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from API: `, error);
    return null;
  }
}

// Generate metadata dynamically based on the anime info
export async function generateMetadata({ params }) {
  try {
    const url = `https://hianimes.vercel.app/anime/info?id=${params.id}`;
    const daty = await fetchDataFromAPI(url, 3600); // Revalidate after 1 hour

    return {
      title: `Watch ${daty.anime.info.name} English Sub/Dub online free on Animoon.me`,
      description: `Animoon is the best site to watch ${daty.anime.info.name} SUB online, or you can even watch underrated anime on Animoon.`,
    };
  } catch (error) {
    console.error("Error fetching metadata: ", error);
    return {
      title: "Watch Anime Online Free on Animoon.me",
      description:
        "Animoon is the best site to watch anime in high quality with both sub and dub options.",
    };
  }
}

// Main page component
export default async function page({ params, searchParams }) {
  const epis = searchParams.ep;
  const episodeIdParam = epis ? `${params.id}?ep=${epis}` : null;

  // Fetch anime info with force-cache and revalidation
  const datao = await fetchDataFromAPI(
    `https://hianimes.vercel.app/anime/info?id=${params.id}`,
    18000 // Revalidate after 5 hours
  );

  // Fetch episodes with force-cache and revalidation
  const data = await fetchDataFromAPI(
    `https://hianimes.vercel.app/anime/episodes/${params.id}`,
    3600 // Revalidate after 1 hour
  );

  // Determine the episode ID
  const epId = episodeIdParam || data?.episodes[0]?.episodeId;

  // Find the episode number
  let episodeNumber = 0;
  if (data?.episodes?.length) {
    const currentEpisode = data.episodes.find((ep) => ep.episodeId === epId);
    episodeNumber = currentEpisode ? currentEpisode.number : 0;
  }

  // Fetch stream data (real-time, no caching)
  let dataj = [];
  const maxRetries = 2; // Number of additional retry attempts
  let attempts = 0;
  
  while (attempts <= maxRetries) {
    try {
      const respStream = await fetch(
        `https://vimalking.vercel.app/api/stream?id=${epId}`,
        { cache: "no-store" } // No cache for real-time streaming data
      );
      dataj = await respStream.json();
      break; // Exit loop if fetch is successful
    } catch (error) {
      console.error(`Attempt ${attempts + 1} - Error fetching stream data: `, error);
      attempts += 1;
      if (attempts > maxRetries) {
        dataj = []; // Set to empty array after max retries
      }
    }
  }
  

  let datau = [];
  try {
    const respS = await fetchDataFromAPI(
      `https://hianimes.vercel.app/anime/search/suggest?q=${params.id}`,
      18000
    );
    datau = respS;
  } catch (error) {
    datau = [];
  }

  let jname = "";
  datau &&
    datau.suggestions &&
    datau?.suggestions?.map((i) => {
      if (i.id === params.id) {
        jname = i.jname;
      }
    });
  let epiod = 0;
  let i = 0;
  for (i > 0; i < data.episodes.length; i++) {
    if (data?.episodes[i].episodeId.includes(epId)) {
      epiod = data.episodes[i].number;
    }
  }
  let gogoEP = [];
  try {
    const gogoTP = await fetchDataFromAPI(
      `https://newgogoking.vercel.app/${datao?.anime?.info?.name}?page=1`,
      3600
    );
    gogoEP = gogoTP;
  } catch (error) {
    gogoEP = [];
  }

  const caseEP = gogoEP?.results?.length > 0 ? gogoEP.results[0]?.id : "";
  let gogoId =
    "/" +
    (
      caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
      `-dub-episode-${epiod}`
    ).replace(/[^a-zA-Z0-9\-]/g, "");
  let caseId =
    "/" +
    (
      caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
      `-episode-${epiod}`
    ).replace(/[^a-zA-Z0-9\-]/g, "");
  // Example data from your `datao` object

  // Example gogoData (with sub and dub information)

  let gogoSub = [];
  try {
    let gogoSC = await fetch(`https://newgogoking.vercel.app/watch/${caseId}`, {
      cache: "force-cache",
    });
    gogoSub = await gogoSC.json();
  } catch (error) {
    gogoSub = [];
  }
  console.log(gogoSub)

  let gogoDub = [];
  try {
    let gogoSC = await fetch(`https://newgogoking.vercel.app/watch/${gogoId}`, {
      cache: "force-cache",
    });
    gogoDub = await gogoSC.json();
  } catch (error) {
    gogoDub = [];
  }
  console.log('sub',gogoSub)

  let subPri = [];
  try {
    let gogoMC = await fetch(
      `https://hianimes.vercel.app/anime/episode-srcs?id=${epId}&serverId=4&category=sub`,
      {
        cache: "force-cache",
      }
    );
    subPri = await gogoMC.json();
  } catch (error) {
    subPri = [];
  }

  const subPrio = subPri && subPri.tracks ? subPri.tracks : "";

  // Fetch homepage data with force-cache and revalidation
  const datapp = await fetchDataFromAPI(
    "https://hianimes.vercel.app/anime/home",
    3600 // Revalidate after 1 hour
  );

  // Share URL and title for the current episode
  const ShareUrl = `https://animoon.me/watch/${epId}`;
  const arise = "this Episode";

  // Render WatchAnime component
  return (
    <div>
      <WatchAnime
        data={data}
        anId={params.id}
        subPrio={subPrio}
        datao={datao}
        epiod={episodeNumber}
        epId={epId}
        epis={epis}
        dataj={dataj}
        datapp={datapp}
        gogoDub={gogoDub}
        gogoSub={gogoSub}
        ShareUrl={ShareUrl}
        arise={arise}
      />
    </div>
  );
}
