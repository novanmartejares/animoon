import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@/lib/rediscache";

// Helper function to get data from Redis or fetch from API
async function getOrFetchFromRedis(key, url, revalidate) {
  try {
    // Try getting data from Redis first
    const cachedData = await redis.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Fetch data from API if not in cache
    const response = await fetch(url, { next: { revalidate } });
    const data = await response.json();

    // Store the data in Redis with an expiration time (revalidate period)
    await redis.set(key, JSON.stringify(data), "EX", revalidate);

    return data;
  } catch (error) {
    console.error(`Error fetching data from Redis or API for key ${key}: `, error);
    return null;
  }
}

// Generate metadata dynamically based on the anime info
export async function generateMetadata({ params }) {
  try {
    const url = `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`;
    const daty = await getOrFetchFromRedis(`anime-info-${params.id}`, url, 60); // 1 minute revalidate

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

  // Fetch anime info using Redis
  const datao = await getOrFetchFromRedis(
    `anime-info-${params.id}`,
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`,
    18000 // 5 hours revalidate
  );

  // Fetch episodes using Redis
  const data = await getOrFetchFromRedis(
    `anime-episodes-${params.id}`,
    `https://aniwatch-api-8fti.onrender.com/anime/episodes/${params.id}`,
    3600 // 1 hour revalidate
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

  // Fetch homepage data using Redis
  const datapp = await getOrFetchFromRedis(
    `anime-home`,
    "https://aniwatch-api-8fti.onrender.com/anime/home",
    3600 // 1 hour revalidate
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
