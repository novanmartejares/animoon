import dynamic from "next/dynamic";
import React from "react";
const DynamicAZ = dynamic(() => import("@/app/AZ/az"), {
  ssr: false,
});

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

export default async function page({ params }) {
  const data = await fetch(
    `https://api.jikan.moe/v4/anime?letter=${params.id}`,
    {
      cache: "force-cache",
    }
  );
  let json = await data.json();

  const resp = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
  const datal = await resp.json();
  return (
    <div>
      <DynamicAZ el={json} data={datal} />
    </div>
  );
}
