import React from "react";
import Share from "@/component/Share/Share";
import Hero from "@/component/Hero/hero";
import Trending from "@/component/Trending/Trending";
import Featured from "@/component/Featured/Featured";
import MainContainer from "@/component/MainContainer/MainContainer";
import { redis } from "@/lib/rediscache";
import Home from "@/app/home/Home";

export default async function Page() {
  const ShareUrl = "https://animoon.me/";

  // Function to fetch data from the API and cache it in Redis
  async function fetchDataWithCache(key, url) {
    let cachedData;

    // Check if the data is already cached in Redis
    if (redis) {
      cachedData = await redis.get(key);
    }

    // If cached data is found, return it
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // If not cached, fetch the data from the API
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    // Cache the fetched data in Redis with an expiration time of 1 hour
    if (redis && data && Object.keys(data).length > 0) {
      await redis.set(key, JSON.stringify(data), "EX", 3600);
    }

    return data;
  }

  // Fetch and cache data from the API routes
  const data = await fetchDataWithCache(
    "anime-home",
    "https://aniwatch-api-8fti.onrender.com/anime/home"
  );
  const dataNew = await fetchDataWithCache(
    "anime-recently-added",
    "https://aniwatch-api-8fti.onrender.com/anime/recently-added?page=1"
  );

  return (
    <div>
      <Home data={data} ShareUrl={ShareUrl} dataNew={dataNew} />
    </div>
  );
}
