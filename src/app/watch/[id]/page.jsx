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
  let dataS = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/schedule?date=${sec.toString()}-${
        min < 10 ? 0 + min.toString() : min.toString()
      }-${hour < 10 ? 0 + hour.toString() : hour.toString()}`,{ next: { revalidate: 3600 } }
    );
    dataS = await respS.json();
    console.log(dataS);
  } catch (error) {
    dataS = [];
  }

  let data = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/episodes/${params.id}`,{ next: { revalidate: 3600 } }
    );
    data = await respS.json();
  } catch (error) {
    data = [];
  }

  const epId = epis ? params.id + "?ep=" + epis : data?.episodes[0]?.episodeId;

  let datal = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/servers?episodeId=${epId}`,
      { next: { revalidate: 18000 } }
    );
    datal = await respS.json();
  } catch (error) {
    datal = [];
  }

  const serverId =
    datal?.sub.length > 0 ? datal?.sub[0]?.serverId : datal?.raw[0]?.serverId;

  let datai = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/episode-srcs?id=${epId}&serverId=${serverId}&category=sub`,
      { next: { revalidate: 18000 } }
    );
    datai = await respS.json();
  } catch (error) {
    datai = [];
  }

  let datao = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`,
      { next: { revalidate: 18000 } }
    );
    datao = await respS.json();
  } catch (error) {
    datao = [];
  }

  let datau = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/search/suggest?q=${params.id}`,
      { cache: "force-cache" }
    );
    datau = await respS.json();
  } catch (error) {
    datau = [];
  }

  let dataj = [];
  try {
    const respS = await fetch(
      `https://anime-api-five-woad.vercel.app/api/stream?id=${epId}`,
      { cache: "force-cache" }
    );
    dataj = await respS.json();
  } catch (error) {
    dataj = [];
  }

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
  let gogoEP = [];
  try {
    const gogoTP = await fetch(`https://newgogo.vercel.app/${datao?.anime?.info?.name}?page=1`,{next: {revalidate: 3600}});
    gogoEP = await gogoTP.json()
  } catch (error) {
    gogoEP = [];
  }

  const caseEP = gogoEP.results[0]?.id || "";
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
  let gogoST = [];
  try {
    gogoST = await gogoanime.fetchEpisodeSources(caseId);
  } catch (error) {
    gogoST = [];
  }

  let datapp = [];
  try {
    const respS = await fetch(
      "https://aniwatch-api-8fti.onrender.com/anime/home",
      { next: { revalidate: 3600 } }
    );
    datapp = await respS.json();
  } catch (error) {
    datapp = [];
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
        name={datao?.info?.name}
        caseEP={caseEP}
        dataj={dataj}
        gogoST={gogoST}
        datapp={datapp}
      />
    </div>
  );
}
