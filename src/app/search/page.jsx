import dynamic from "next/dynamic";
import React from "react";
const DynamicSearch = dynamic(
  () => import("@/app/SearchResults/SearchResults"),
  {
    ssr: false,
  }
);

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Kaidox.xyz ( kaido.to | kaidoanime.netlify.app | kaido ) , free Anime Streaming`,
    description: `KaidoX ( Kaido ) is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on KaidoX ( Kaido ) website.`,
  };
}

export default async function page({ searchParams }) {
  const query = searchParams.name ? searchParams.name : "naruto";
  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/search?q=${query}&page=1`,
    { cache: "no-store" }
  );
  const data = await resp.json();
  console.log(data);
  const respl = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/home"
  );
  const datal = await respl.json();
  return (
    <div>
      <DynamicSearch data={data} datal={datal} />
    </div>
  );
}
