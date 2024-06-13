import dynamic from 'next/dynamic';
import React from 'react'
const DynamicCate = dynamic(() => import("@/app/Gridle/page"), {
    ssr: false,
  });
export default async function page({searchParams}) {
    const cate = searchParams.name.toString()
    const fiki = searchParams.heading.toString()
    const resp = await fetch(`https://aniwatch-api-8fti.onrender.com/anime/${cate}?page=1`);
    const data = await resp.json();
    const respl = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
    const datal = await respl.json();

  return (
    <div>
      <DynamicCate data={data} fiki={fiki} datal={datal}/>
    </div>
  )
}


