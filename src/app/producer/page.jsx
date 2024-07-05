import React from "react";
import dynamic from "next/dynamic";
const DynamicCate = dynamic(() => import("@/app/Gridle/page"), {
  ssr: false,
});

export default async function Producer({ searchParams }) {
  const fiki = searchParams.name
  const hiki = searchParams.name.toString().replaceAll(" ", "-").toLocaleLowerCase().replace(/[^a-zA-Z0-9\-]/g, "")
  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/producer/${hiki}?page=1`
  );
  const data = await resp.json();
  console.log(data);
  const respl = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
  const datal = await respl.json();

  const ShareUrl = `https://kaidox.xyz/producer?name=${fiki}`

  const arise = `${fiki} Anime`

  return (
    <div>
      <DynamicCate data={data} name={fiki} dev={hiki} datal={datal} ShareUrl={ShareUrl} arise={arise}/>
    </div>
  );
}
