import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
import axios from "axios";
import * as cheerio from "cheerio";
// import { currentUser } from "@clerk/nextjs/server";

async function fetchDataFromAPI(url, revalidate) {
  try {
    const response = await fetch(url, {
      cache: "force-cache", // Cache the response forcefully
      next: { revalidate },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from API: `, error);
    return null;
  }
}

// Generate metadata dynamically based on the anime info
export async function generateMetadata({ params }) {
  try {
    const datao = await fetchDataFromAPI(
      `https://hianimes.animoon.me/anime/info?id=${params.id}`,
      18000 // Revalidate after 5 hours
    );
    const daty = datao;

    return {
      title: `Watch ${daty.anime.info.name} English Sub/Dub online free on Animoon.me`,
      description: `Animoon is the best site to watch ${daty.anime.info.name} SUB online, or you can even watch underrated anime on Animoon.`,
    };
  } catch (error) {
    console.error("Error fetching metadata: ", error);
    return {
      title: "Watch Anime Online Free on Animoon.me",
      description:
        "Animoon is the best site to watch anime in high quality with both sub and dub options.",
    };
  }
}

// Main page component
export default async function page({ params, searchParams }) {
  const epis = searchParams.ep;
  const episodeIdParam = epis ? `${params.id}?ep=${epis}` : null;

  const idToCheck = params.id;


  // Fetch anime info with force-cache and revalidation
  const datao = await fetchDataFromAPI(
    `https://hianimes.animoon.me/anime/info?id=${params.id}`,
    18000 // Revalidate after 5 hours
  );
  console.log(datao);

  // Fetch episodes with force-cache and revalidation
  const data = await fetchDataFromAPI(
    `https://hianimes.animoon.me/anime/episodes/${params.id}`,
    3600 // Revalidate after 1 hour
  );
  console.log(data);

  // Determine the episode ID
  const epId = episodeIdParam || data?.episodes[0]?.episodeId;

  // Find the episode number
  let episodeNumber = 0;
  if (data?.episodes?.length) {
    const currentEpisode = data.episodes.find((ep) => ep.episodeId === epId);
    episodeNumber = currentEpisode ? currentEpisode.number : 0;
  }

  let epiod = 0;
  let i = 0;
  for (i > 0; i < data.episodes.length; i++) {
    if (data?.episodes[i].episodeId.includes(epId)) {
      epiod = data.episodes[i].number;
    }
  }

  // Fetch stream data (real-time, no caching)
  let dataj = [];
  // try {
  //   const respStream = await fetch(
  //     `https://vimal.animoon.me/api/stream?id=${epId}`,
  //     { cache: "no-store" } // No cache for real-time streaming data
  //   );
  //   dataj = await respStream.json();
  // } catch (error) {
  //   console.error("Error fetching stream data: ", error);
  //   dataj = [];
  // }

  const dataStr = { sub: [], dub: [] }; // Separate arrays for sub and dub URLs

  try {
    // Step 1: Fetch the server list for the episode
    const episodeId = epis ? epis : data.episodes[0].episodeId.split("ep=")[1];
    const serversResponse = await axios.get(
      `https://hianime.to/ajax/v2/episode/servers?episodeId=${episodeId}`
    );
    const serversData = serversResponse.data;
  
    if (serversData?.html) {
      const $ = cheerio.load(serversData.html);
  
      // Extract SUB and DUB server data
      ["sub", "dub"].forEach((type) => {
        $(`div.ps_-block-sub.servers-${type} div.server-item`).each((_, element) => {
          const dataId = $(element).attr("data-id");
          if (dataId) {
            dataStr[type].push({ id: dataId, url: null }); // Initialize URL as null
          }
        });
      });
  
      // Step 2: Fetch sources for all `data-id`s in parallel
      for (const type of ["sub", "dub"]) {
        await Promise.all(
          dataStr[type].map(async (server) => {
            try {
              const sourcesResponse = await axios.get(
                `https://hianime.to/ajax/v2/episode/sources?id=${server.id}`
              );
              const sourcesData = sourcesResponse.data;
  
              if (sourcesData?.link) {
                const match = sourcesData.link.match(/e-1\/(.*?)\?k=1/);
                if (match && match[1]) {
                  const extractedText = match[1];
                  server.url = `https://ea.bunniescdn.online/embed-2/e-1/${extractedText}?k=1&ep_id=${server.id}&autostart=true`;
                }
              }
            } catch (err) {
              console.error(`Error fetching sources for server ID ${server.id}:`, err.message);
            }
          })
        );
      }
  
      console.log("Extracted EA URLs:", dataStr);
    } else {
      console.error("Invalid servers response or missing HTML.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  

  let datau = [];
  // try {
  //   const respS = await fetch(
  //     `https://hianimes.animoon.me/anime/search/suggest?q=${params.id}`,
  //     { cache: "force-cache" }
  //   );
  //   datau = await respS.json();
  // } catch (error) {
  //   datau = [];
  // }

  let jname = "";
  // datau &&
  //   datau.suggestions &&
  //   datau?.suggestions?.map((i) => {
  //     if (i.id === params.id) {
  //       jname = i.jname;
  //     }
  //   });

  let gogoEP = [];
  // try {
  //   const gogoTP = await fetch(
  //     `https://newgogoking.vercel.app/${datao?.anime?.info?.name}?page=1`,
  //     { cache: "force-cache" }
  //   );
  //   gogoEP = await gogoTP.json();
  // } catch (error) {
  //   gogoEP = [];
  // }

  // const caseEP = gogoEP?.results?.length > 0 ? gogoEP.results[0]?.id : "";
  // let gogoId =
  //   "/" +
  //   (
  //     caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
  //     `-dub-episode-${epiod}`
  //   ).replace(/[^a-zA-Z0-9\-]/g, "");
  // let caseId =
  //   "/" +
  //   (
  //     caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
  //     `-episode-${epiod}`
  //   ).replace(/[^a-zA-Z0-9\-]/g, "");
  // Example data from your `datao` object

  // Example gogoData (with sub and dub information)
  let gogoSub = [];
  // try {
  //   let gogoSC = await fetch(`https://newgogoking.vercel.app/watch/${caseId}`, {
  //     cache: "force-cache",
  //   });
  //   gogoSub = await gogoSC.json();
  // } catch (error) {
  //   gogoSub = [];
  // }
  // console.log(gogoSub);

  let gogoDub = [];
  // try {
  //   let gogoSC = await fetch(`https://newgogoking.vercel.app/watch/${gogoId}`, {
  //     cache: "force-cache",
  //   });
  //   gogoDub = await gogoSC.json();
  // } catch (error) {
  //   gogoDub = [];
  // }
  // console.log("sub", gogoSub);

  let subPri = [];
  // try {
  //   let gogoMC = await fetch(
  //     `https://hianimes.animoon.me/anime/episode-srcs?id=${epId}&serverId=4&category=sub`,
  //     {
  //       cache: "force-cache",
  //     }
  //   );
  //   subPri = await gogoMC.json();
  // } catch (error) {
  //   console.error("Error fetching subtitle data:", error);
  //   subPri = [];
  // }

  // Check if subPri is empty or null before making the second fetch
  if (!subPri || subPri.length === 0) {
    // try {
    //   let gogoMC = await fetch(
    //     `https://hianimes.animoon.me/anime/episode-srcs?id=${epId}&serverId=4&category=raw`,
    //     {
    //       cache: "force-cache",
    //     }
    //   );
    //   subPri = await gogoMC.json();
    // } catch (error) {
    //   console.error("Error fetching raw data:", error);
    //   subPri = [];
    // }
  }

  const subPrio = subPri && subPri.tracks ? subPri.tracks : "";

  // Fetch homepage data with force-cache and revalidation
  const datapp = await fetchDataFromAPI(
    "https://hianimes.animoon.me/anime/home",
    3600 // Revalidate after 1 hour
  );

  // Share URL and title for the current episode
  const ShareUrl = `https://animoon.me/watch/${epId}`;
  const arise = "this Episode";

  // Render WatchAnime component
  return (
    <div>
      <WatchAnime
        data={data}
        anId={params.id}
        subPrio={subPrio}
        dataStr={dataStr}
        datao={datao}
        epiod={episodeNumber}
        epId={epId}
        epis={epis}
        dataj={dataj}
        datapp={datapp}
        gogoDub={gogoDub}
        gogoSub={gogoSub}
        ShareUrl={ShareUrl}
        arise={arise}
      />
    </div>
  );
}
