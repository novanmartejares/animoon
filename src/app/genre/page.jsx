import dynamic from 'next/dynamic';
import React from 'react'
const DynamicCate = dynamic(() => import("@/app/Gridle/page"), {
    ssr: false,
  });
export default async function page({searchParams}) {
    const cate = searchParams.name.toString()
    const resp = await fetch(`https://api-aniwatch.onrender.com/anime/genre/${cate}?page=1`);
    const data = await resp.json();
  return (
    <div>
      <DynamicCate data={data} name={cate}/>
    </div>
  )
}


