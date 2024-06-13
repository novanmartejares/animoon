import dynamic from "next/dynamic";
import React from "react";
const DynamicSearch = dynamic(() => import("@/app/SearchResults/SearchResults"), {
  ssr: false,
});

export default async function page({searchParams}) {
  const query = searchParams.name ? searchParams.name : 'naruto'
    const resp = await fetch(
        `https://aniwatch-api-8fti.onrender.com/anime/search?q=${query}&page=1`,{cache: 'no-store'
        }
      );
      const data = await resp.json();
      console.log(data);
      const respl = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
      const datal = await respl.json();
  return (
    <div>
      <DynamicSearch data={data} datal={datal}/>
    </div>
  )
}


