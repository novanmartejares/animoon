import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";

export default async function page({ params, searchParams }) {
  const epis = searchParams.ep;

  const time = new Date();

  const hour = time.getDate();

  const min = time.getMonth();

  const sec = time.getFullYear();
  let dataS = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/schedule?date=${sec.toString()}-${
        min < 10 ? 0 + min.toString() : min.toString()
      }-${hour < 10 ? 0 + hour.toString() : hour.toString()}`,
      { next: { revalidate: 3600 } }
    );
    dataS = await respS.json();
  } catch (error) {
    dataS = [];
  }

  let data = [];
  try {
    const respS = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/episodes/${params.id}`,
      { next: { revalidate: 3600 } }
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
  const arr =
    "the-demon-slayer-kimetsu-no-yaiba-mugen-train-arc-tv-17914?ep=84111,shinkalion-change-the-world-19150?ep=123247,the-many-sides-of-voice-actor-radio-19121?ep=123284,garouden-the-way-of-the-lone-wolf-19165?ep=124503,remonster-19123?ep=123153,wind-breaker-19136?ep=124211,wind-breaker-19136?ep=123718,classroom-of-the-elite-iii-18880?ep=119983,classroom-of-the-elite-iii-18880?ep=114619,amagi-brilliant-park-wakuwaku-mini-theater-rakugaki-backstage-5174?ep=40728,the-irregular-at-magic-high-school-season-3-19142?ep=123216,overlord-iii-553?ep=10897,assault-lily-bouquet-5584?ep=55034,assault-lily-bouquet-5584?ep=55032,red-data-girl-5354?ep=41379,red-data-girl-5354?ep=41385,the-vexations-of-a-shut-in-vampire-princess-18589?ep=107906,train-to-the-end-of-the-world-special-19197?ep=125456,ayakashi-triangle-special-recap-18360?ep=99784,naruto-shippuden-355?ep=7916,the-night-before-special-the-long-awaited-utopia-7790?ep=108989,the-irregular-at-magic-high-school-season-3-19142?ep=123872,suzumes-doorlocking-18190?ep=100501";
  const endpoints = arr.split(",");
  const baseURL = "https://aniwatch-api-8fti.onrender.com/anime/info?id=";

  async function fetchData(endpoint) {
    try {
      const response = await fetch(baseURL + endpoint);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from ${endpoint}: ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Fetch data from all endpoints
  async function fetchAllData() {
    const allData = {};
    for (const endpoint of endpoints) {
      const data = await fetchData(endpoint);
      if (data) {
        allData[endpoint] = data;
      }
    }
    return allData;
  }

  // Call the function and handle the result
  fetchAllData().then((allData) => {
    console.log(allData);
  });

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
      `https://vimal-two.vercel.app/api/stream?id=${epId}`,
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
  let epiod = 0;
  let i = 0;
  for (i > 0; i < data.episodes.length; i++) {
    if (data?.episodes[i].episodeId.includes(epis?.toString())) {
      epiod = data.episodes[i].number;
    }
  }
  let gogoEP = [];
  try {
    const gogoTP = await fetch(
      `https://newgogo.vercel.app/${datao?.anime?.info?.name}?page=1`,
      { next: { revalidate: 3600 } }
    );
    gogoEP = await gogoTP.json();
  } catch (error) {
    gogoEP = [];
  }

  const caseEP = gogoEP?.results?.length > 0 ? gogoEP.results[0]?.id : "";
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
    let gogoSC = await fetch(`https://newgogo.vercel.app/watch/${caseId}`, {
      cache: "force-cache",
    });
    gogoST = gogoSC.json();
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

  const ShareUrl = `https://animoon.me/watch/${epId}`;
  const arise = "this Episode";
  let Dubrl = "";
  let Subrl = "";
  dataj &&
    dataj.results &&
    dataj.results.streamingInfo.map((i) => {
      if (i?.value?.decryptionResult?.server === "HD-1") {
        if (i?.value?.decryptionResult?.type === "dub") {
          Dubrl = i.value.decryptionResult.link;
        }
      }
    });

  dataj &&
    dataj.results &&
    dataj.results.streamingInfo.map((i) => {
      if (i?.value?.decryptionResult?.server === "HD-1") {
        if (i?.value?.decryptionResult?.type === "sub") {
          Subrl = i.value.decryptionResult.link;
        }
      }
    });

  return (
    <div>
      <WatchAnime
        data={data}
        datal={datal}
        datai={datai}
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
        ShareUrl={ShareUrl}
        Subrl={Subrl}
        Dubrl={Dubrl}
        arise={arise}
      />
    </div>
  );
}
