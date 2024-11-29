import React from "react";
import CreateLive from "../../../component/CreateLive/CreateLive";

export default async function page({ params, searchParams }) {
  let data = [];
  if (searchParams.animeId) {
    const resp = await fetch(
      `https://hianimes.vercel.app/anime/info?id=${searchParams.animeId}`
    );
    data = await resp.json();
  }
  return (
    <div>
      <CreateLive data={data}/>
    </div>
  );
}
