import SearchResults from "@/app/SearchResults/SearchResults";
import React from "react";

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Animoon.me , free Anime Streaming`,
    description: `Animoon is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default async function page({ searchParams }) {
  const query = searchParams.name ? searchParams.name : "naruto";
  const resp = await fetch(
    `https://hianimes.vercel.app/anime/search?q=${query}&page=1`,
    { cache: "no-store" }
  );
  const data = await resp.json();
  console.log(data);
  const respl = await fetch(
    "https://hianimes.vercel.app/anime/home"
  );
  const datal = await respl.json();
  return (
    <div>
      <SearchResults data={data} datal={datal} />
    </div>
  );
}
