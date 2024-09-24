import SearchResults from "@/app/AZ/az";
import React from "react";

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Animoon, free Anime Streaming`,
    description: `Animoon is the best site to watch
                    ${idd} SUB online, or you can even
                    watch ${idd} DUB in HD quality. You
                    can also watch underrated anime
                    on Animoon website.`,
  };
}

export default async function page({ params, searchParams }) {
  let json = "";
  const cacheMaxAge = 345600; // 4 days in seconds

  try {
    const url = searchParams.sort
      ? `https://vimalking.vercel.app/api/az-list/${searchParams.sort}?page=${searchParams.page || "1"}`
      : `https://vimalking.vercel.app/api/az-list?page=${searchParams.page || "1"}`;

    const data = await fetch(url, {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, max-age=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge}`,
      },
    });

    json = await data.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return (
    <div>
      <SearchResults
        el={json}
        sort={searchParams.sort}
        page={searchParams.page}
        para={params.id}
      />
    </div>
  );
}
