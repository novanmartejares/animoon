import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(
  () => import("../../../layouts/RecommendedTopTen"),
  {
    ssr: false,
  }
);

export async function generateMetadata({ params }) {
  const idd = params.id;

  return {
    title: `Watch ${idd} English Sub/Dub online free on Kaidox.xyz ( kaido.to | kaidoanime.netlify.app | kaido )`,
    description: `KaidoX ( Kaido ) is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on KaidoX ( Kaido ) website.`,
  };
}


export default async function page({ params }) {
  const idd = params.id;

  const respo = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/search/suggest?q=${idd}`,
    { next: { revalidate: 600 } }
  );
  const daty = await respo.json();
  let animeI = "";
  const anIde = daty.suggestions.map((i) => {
    if (
      i.jname.replace(/[^a-zA-Z0-9\-\s]/g, "") === idd.replaceAll("%20", " ")
    ) {
      animeI = i.id;
    }
    if (
      i.name.replace(/[^a-zA-Z0-9\-\s]/g, "") === idd.replaceAll("%20", " ")
    ) {
      animeI = i.id;
    }
    if (animeI === "") {
      if (
        i.jname
          .replace(/[^a-zA-Z0-9\-\s]/g, "")
          .includes(idd.replaceAll("%20", " "))
      ) {
        animeI = i.id;
      }
      if (
        i.name
          .replace(/[^a-zA-Z0-9\-\s]/g, "")
          .includes(idd.replaceAll("%20", " "))
      ) {
        animeI = i.id;
      }
    }
  });
  console.log(animeI);
  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${animeI}`,
    { next: { revalidate: 600 } }
  );
  const dat = await resp.json();
  let datp = dat;

  const respp = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
  const data = await respp.json();

  const ShareUrl = `https://kaidox.xyz/details/${idd}`

  const arise = 'this Anime'

  return (
    <div>
      <DynamicTopTen uiui={datp} data={data} ShareUrl={ShareUrl} arise={arise}/>
    </div>
  );
}
