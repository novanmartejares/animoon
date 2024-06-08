import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(() => import("../../layouts/RecommendedTopTen"), {
  ssr: false,
});

export default async function page({ params, searchParams }) {
  const uiui = searchParams.rand || "sand-land-the-series-19070";

  let datp = null;
  if (uiui <= 16) {
    const resp = await fetch(
      `https://api-aniwatch.onrender.com/anime/random?page=1`,{next:{revalidate: 60}}
    );
    const dat = await resp.json();
    const x = uiui || 0;
    const idd = dat?.animes[x]?.id;

    const respo = await fetch(
      `https://api-aniwatch.onrender.com/anime/info?id=${idd}`,{next:{revalidate: 60}}
    );
    const daty = await respo.json();
    datp = daty;
  } else {
    const respt = await fetch(
      `https://api-aniwatch.onrender.com/anime/random?page=1`,{next:{revalidate: 60}}
    );
    const datyu = await respt.json();
    const xi = uiui || 0;
    const iddp = datyu?.animes[xi]?.id;

    const respo = await fetch(
      `https://api-aniwatch.onrender.com/anime/info?id=${iddp}`,{next:{revalidate: 60}}
    );
    const daty = await respo.json();
    datp = daty;
  }
  return (
    <div>
      <DynamicTopTen uiui={datp} />
    </div>
  );
}
