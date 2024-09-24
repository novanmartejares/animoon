import React from "react";
import Home from "@/app/home/Home";

export default async function Page() {
  const ShareUrl = "https://animoon.me/";

  // Function to fetch data with cache and revalidation
  async function fetchDataWithCache(url) {
    const response = await fetch(url, {
      cache: "force-cache",  // Forces the cache to be used
      next: { revalidate: 3600 }  // Revalidates the cache after 1 hour (3600 seconds)
    });
    
    const data = await response.json();
    return data;
  }

  // Fetch and cache data from the API routes
  const data = await fetchDataWithCache(
    "https://hianimes.vercel.app/anime/home"
  );
  const dataNew = await fetchDataWithCache(
    "https://hianimes.vercel.app/anime/recently-added?page=1"
  );

  return (
    <div>
      <Home data={data} ShareUrl={ShareUrl} dataNew={dataNew} />
    </div>
  );
}
