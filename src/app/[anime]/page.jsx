import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(() => import("../../layouts/RecommendedTopTen"), {
  ssr: true,
});

export async function generateMetadata({ params }) {
  const respo = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.anime}`,
    { next: { revalidate: 60 } }
  );
  const daty = await respo.json();
  return {
    title: `Watch ${daty.anime.info.name} English Sub/Dub online free on Animoon.me`,
    description: `Animoom is the best site to watch
                      ${daty.anime.info.name} SUB online, or you can even
                      watch ${daty.anime.info.name} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default async function page({ params }) {
  const idd = params.anime;

  const respo = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${idd}`,
    { next: { revalidate: 60 } }
  );
  const daty = await respo.json();
  let datp = daty;

  const resp = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
  const data = await resp.json();

  const ShareUrl = `https://animoon.me/${params.anime}`;

  const arise = "this Anime";

  return (
    <div>
      <DynamicTopTen
        uiui={datp}
        data={data}
        ShareUrl={ShareUrl}
        arise={arise}
      />
    </div>
  );
}
