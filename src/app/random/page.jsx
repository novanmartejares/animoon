import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(() => import("../../layouts/RecommendedTopTen"), {
  ssr: false,
});

export default async function page({ params, searchParams }) {
  const uiui = searchParams.rand || "sand-land-the-series-19070";
  let ShareUrl = 'https://animoon.me/'
  let datp = null;
  if (uiui <= 16) {
    const resp = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/random?page=1`,{next:{revalidate: 60}}
    );
    const dat = await resp.json();
    const x = uiui || 0;
    const idd = dat?.animes[x]?.id;

    const respo = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/info?id=${idd}`,{next:{revalidate: 60}}
    );
    const daty = await respo.json();
    datp = daty;
    ShareUrl = `https://animoon.me/${idd}`
  } else {
    const respt = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/random?page=1`,{next:{revalidate: 60}}
    );
    const datyu = await respt.json();
    const xi = uiui || 0;
    const iddp = datyu?.animes[xi]?.id;

    const respo = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/info?id=${iddp}`,{next:{revalidate: 60}}
    );
    const daty = await respo.json();
    datp = daty;
    ShareUrl = `https://animoon.me/${iddp}`
  }
  const respl = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
  const data = await respl.json();

  const arise = 'this Anime'

  return (
    <div>
      <DynamicTopTen uiui={datp} rand={uiui} data={data} ShareUrl={ShareUrl} arise={arise}/>
    </div>
  );
}
