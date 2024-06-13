import React from "react";
import dynamic from "next/dynamic";
const DynamicTopTen = dynamic(
  () => import("../../../layouts/RecommendedTopTen"),
  {
    ssr: false,
  }
);

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

  return (
    <div>
      <DynamicTopTen uiui={datp} data={data}/>
    </div>
  );
}
