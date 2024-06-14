import React, { cache } from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
import { ANIME } from "@consumet/extensions";

export default async function page({ params, searchParams }) {
  const dub = searchParams.dub;
  const sub = searchParams.sub;
  const epis = searchParams.ep;

  const time = new Date();
  console.log(time);

  const hour = time.getDate();

  const min = time.getMonth();

  const sec = time.getFullYear();

  const respS = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/schedule?date=${sec.toString()}-${
      min < 10 ? 0 + min.toString() : min.toString()
    }-${hour < 10 ? 0 + hour.toString() : hour.toString()}`
  );
  const dataS = await respS.json();
  console.log(dataS);

  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/episodes/${params.id}`,
    { next: { revalidate: 18000 } }
  );
  const data = await resp.json();

  const epId = epis ? params.id + "?ep=" + epis : data?.episodes[0]?.episodeId;

  const respo = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/servers?episodeId=${epId}`,
    { next: { revalidate: 18000 } }
  );
  const datal = await respo?.json();

  const serverId =
    datal?.sub.length > 0 ? datal?.sub[0]?.serverId : datal?.raw[0]?.serverId;
  const respi = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/episode-srcs?id=${epId}&serverId=${serverId}&category=sub`,
    { next: { revalidate: 18000 } }
  );
  const datai = await respi.json();

  const respl = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`,
    { next: { revalidate: 18000 } }
  );
  const datao = await respl.json();

  const respu = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/search/suggest?q=${params.id}`,
    { cache: "force-cache" }
  );
  const datau = await respu.json();

  const respj = await fetch(
    `https://anime-api-five-woad.vercel.app/api/stream?id=${epId}`,
    {cache: 'force-cache'}
  );
  const dataj = await respj.json();

  let jname = "";
  datau &&
    datau.suggestions &&
    datau?.suggestions?.map((i) => {
      if (i.id === params.id) {
        jname = i.jname;
      }
    });
  console.log(jname);
  const gogoanime = new ANIME.Gogoanime();
  let epiod = 0;
  let i = 0;
  for (i > 0; i < data.episodes.length; i++) {
    if (data?.episodes[i].episodeId.includes(epis?.toString())) {
      epiod = data.episodes[i].number;
    }
  }

  const gogoEP = await gogoanime.search(datao?.anime?.info?.name);
  const caseEP = gogoEP.results[0]?.id || '';
  let gogoId =
    "/" +
    (
      jname.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
      `-episode-${epiod}`
    ).replace(/[^a-zA-Z0-9\-]/g, "");
  let caseId = caseEP
    ? "/" +
      (
        caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
        `-episode-${epiod}`
      ).replace(/[^a-zA-Z0-9\-]/g, "")
    : gogoId;
    let gogoST = []
    try {
      gogoST = await gogoanime.fetchEpisodeSources(caseId);
    } catch (error) {
      gogoST = []
    }
  
  const respp = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/home"
  );
  const datapp = await respp.json();

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
        name={datao?.info?.name}
        caseEP={caseEP}
        dataj={dataj}
        gogoST={gogoST}
        datapp={datapp}
      />
    </div>
  );
}
