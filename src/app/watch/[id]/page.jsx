import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
import { currentUser } from "@clerk/nextjs/server";

// Helper function to fetch data with force-cache and revalidate options
async function fetchDataFromAPI(url, revalidate) {
  try {
    const response = await fetch(url, {
      cache: "force-cache", // Cache the response forcefully
      next: { revalidate }, // Revalidate after the specified time (in seconds)
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
    const url = `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`;
    const daty = await fetchDataFromAPI(url, 3600); // Revalidate after 1 hour

    return {
      title: `Watch ${daty.anime.info.name} English Sub/Dub online free on Animoon.me`,
      description: `Animoon is the best site to watch ${daty.anime.info.name} SUB online, or you can even watch underrated anime on Animoon.`,
    };
  } catch (error) {
    console.error("Error fetching metadata: ", error);
    return {
      title: "Watch Anime Online Free on Animoon.me",
      description: "Animoon is the best site to watch anime in high quality with both sub and dub options.",
    };
  }
}

// Main page component
export default async function page({ params, searchParams }) {
  const user = await currentUser();
  const firstName = user?.firstName;
  const userName = user?.username;
  const imageUrl = user?.imageUrl;
  const emailAdd = user?.emailAddresses[0]?.emailAddress;

  const epis = searchParams.ep;
  const episodeIdParam = epis ? `${params.id}?ep=${epis}` : null;

  // Fetch anime info with force-cache and revalidation
  const datao = await fetchDataFromAPI(
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`,
    18000 // Revalidate after 5 hours
  );

  // Fetch episodes with force-cache and revalidation
  const data = await fetchDataFromAPI(
    `https://aniwatch-api-8fti.onrender.com/anime/episodes/${params.id}`,
    3600 // Revalidate after 1 hour
  );

  // Determine the episode ID
  const epId = episodeIdParam || data?.episodes[0]?.episodeId;

  // Find the episode number
  let episodeNumber = 0;
  if (data?.episodes?.length) {
    const currentEpisode = data.episodes.find(ep => ep.episodeId === epId);
    episodeNumber = currentEpisode ? currentEpisode.number : 0;
  }

  // Fetch stream data (real-time, no caching)
  let dataj = [];
  try {
    const respStream = await fetch(
      `https://demonking-7hti.onrender.com/api/stream?id=${epId}`,
      { cache: "no-store" } // No cache for real-time streaming data
    );
    dataj = await respStream.json();
  } catch (error) {
    console.error("Error fetching stream data: ", error);
    dataj = [];
  }

  // Fetch homepage data with force-cache and revalidation
  const datapp = await fetchDataFromAPI(
    "https://aniwatch-api-8fti.onrender.com/anime/home",
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
        datao={datao}
        epiod={episodeNumber}
        epId={epId}
        epis={epis}
        dataj={dataj}
        datapp={datapp}
        ShareUrl={ShareUrl}
        arise={arise}
        firstName={firstName}
        userName={userName}
        imageUrl={imageUrl}
        emailAdd={emailAdd}
      />
    </div>
  );
}
