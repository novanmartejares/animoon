import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(() => import("../../layouts/RecommendedTopTen"), {
  ssr: false,
});

export default async function page({ params }) {
  const idd = params.anime;

  const respo = await fetch(
    `https://api-aniwatch.onrender.com/anime/info?id=${idd}`,
    { next: { revalidate: 60 } }
  );
  const daty = await respo.json();
  let datp = daty;

  return (
    <div>
      <DynamicTopTen uiui={datp} />
    </div>
  );
}
