import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(() => import("../../layouts/RecommendedTopTen"), {
  ssr: true,
});

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

  return (
    <div>
      <DynamicTopTen uiui={datp} data={data}/>
    </div>
  );
}
