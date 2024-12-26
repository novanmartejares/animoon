import React from "react";
import CreateLive from "../../../component/CreateLive/CreateLive";
import LivePage from "../../../component/LivePage/LivePage";

export default async function page({ params, searchParams }) {
  let data = [];
  if (searchParams.animeId) {
    const resp = await fetch(
      `https://hianimes.animoon.me/anime/info?id=${searchParams.animeId}`
    );
    data = await resp.json();
  }

  let datal = [];
  let dataEpi = [];
  let dataStream = [];
  if (searchParams.anId) {
    const epis = searchParams.ep;
    const episodeIdParam = epis ? `${params.id}?ep=${epis}` : null;

    const resp = await fetch(
      `https://hianimes.animoon.me/anime/info?id=${searchParams.anId}`
    );
    datal = await resp.json();

    const respo = await fetch(
      `https://hianimes.animoon.me/anime/episodes/${searchParams.anId}`
    );
    dataEpi = await respo.json();

    // Determine the episode ID
    const epId = episodeIdParam || dataEpi?.episodes[0]?.episodeId;

    const respi = await fetch(
      `https://vimal.animoon.me/api/stream?id=${epId}`,
      { cache: "no-store" }
    );
    dataStream = await respi.json();
  }
  return (
    <div>
      {searchParams.animeId ? (
        <CreateLive data={data} />
      ) : (
        <LivePage datal={datal} dataEpi={dataEpi} dataStream={dataStream} id={params.id}/>
      )}
    </div>
  );
}
