import dynamic from "next/dynamic";
import React from "react";
const DynamicAZ = dynamic(() => import("@/app/AZ/az"), {
  ssr: false,
});

export default async function page({ params }) {
  const data = await fetch(`https://api.jikan.moe/v4/anime?letter=${params.id}`, {
    cache: "force-cache",
  });
  let json = await data.json();
  return <div><DynamicAZ el={json}/></div>;
}
