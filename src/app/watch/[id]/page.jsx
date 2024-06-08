import React, { cache } from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
import { ANIME } from "@consumet/extensions";

export default async function page({ params, searchParams }) {
  const dub = searchParams.dub;
  const sub = searchParams.sub;
  const epis = searchParams.ep;

  const time = new Date()
  console.log(time)

  const hour = time.getDate()

  const min = time.getMonth()

  const sec = time.getFullYear()

  const respS = await fetch(
    `https://api-aniwatch.onrender.com/anime/schedule?date=${sec.toString()}-${min < 10 ? 0 + min.toString() : min.toString()}-${hour < 10 ? 0 + hour.toString() : hour.toString()}`
  );
  const dataS = await respS.json();
  console.log(dataS);

  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/episodes/${params.id}`,
    { next: { revalidate: 18000 } }
  );
  const data = await resp.json();

  const epId = epis ? params.id + "?ep=" + epis : data?.episodes[0]?.episodeId;

  const respo = await fetch(
    `https://api-aniwatch.onrender.com/anime/servers?episodeId=${epId}`,
    { next: { revalidate: 18000 } }
  );
  const datal = await respo?.json();

  const serverId =
    datal?.sub.length > 0 ? datal?.sub[0]?.serverId : datal?.raw[0]?.serverId;
  const respi = await fetch(
    `https://api-aniwatch.onrender.com/anime/episode-srcs?id=${epId}&serverId=${serverId}&category=sub`,
    { next: { revalidate: 18000 } }
  );
  const datai = await respi.json();

  const respl = await fetch(
    `https://api-aniwatch.onrender.com/anime/info?id=${params.id}`,
    { next: { revalidate: 18000 } }
  );
  const datao = await respl.json();

  const respu = await fetch(
    `https://api-aniwatch.onrender.com/anime/search/suggest?q=${params.id}`,
    { next: { revalidate: 18000 } }
  );
  const datau = await respu.json();

  const respj = await fetch(
    `https://anime-api-five-woad.vercel.app/api/stream?id=${epId}`,
    { next: { revalidate: 18000 } }
  );
  const dataj = await respj.json();

  let jname = "";
  datau?.suggestions?.map((i) => {
    if (i.id === params.id) {
      jname = i.jname;
    }
  });
  const gogoanime = new ANIME.Gogoanime();
  let gogoId =
    "/" + jname.toLocaleLowerCase().replaceAll(" ", "-") + "-episode-1";
  const fetchData = async () => {
    try {
      return await gogoanime.fetchEpisodeSources(gogoId);
    } catch (error) {
      console.error(error); // You might send an exception to your error tracker like AppSignal
      return [];
    }
  };

  let datag = await fetchData();

  let isGogo = "";
  if (datag && datag.length > 0) {
    isGogo = "yes";
  }

  return (
    <div>
      <WatchAnime
        data={data}
        datal={datal}
        datai={datai}
        dub={dub}
        sub={sub}
        anId={params.id}
        datao={datao}
        epId={epId}
        epis={epis}
        jname={jname}
        datag={datag}
        isGogo={isGogo}
        dataj={dataj}
      />
    </div>
  );
}
