import React from "react";
import RecommendedTopTen from "../../layouts/RecommendedTopTen";

export async function generateMetadata({ params }) {
  const respo = await fetch(
    `https://hianimes.animoon.me/anime/info?id=${params.anime}`,
    { next: { revalidate: 60 } }
  );
  const daty = await respo.json();
  return {
    title: `Watch ${daty?.anime?.info?.name} English Sub/Dub online free on Animoon.me`,
    description: `Animoon is the best site to watch
                      ${daty?.anime?.info?.name} SUB online, or you can even
                      watch ${daty?.anime?.info?.name} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default async function page({ params }) {
  const idd = params.anime;

  const respo = await fetch(
    `https://hianimes.animoon.me/anime/info?id=${idd}`,
    { next: { revalidate: 60 } }
  );
  const daty = await respo.json();
  let datp = daty;

  const resp = await fetch("https://hianimes.animoon.me/anime/home");
  const data = await resp.json();

  const ShareUrl = `https://animoon.me/${params.anime}`;

  const arise = "this Anime";

  return (
    <div>
      <RecommendedTopTen
        uiui={datp}
        data={data}
        ShareUrl={ShareUrl}
        arise={arise}
        // firstName={firstName}
      />
    </div>
  );
}
