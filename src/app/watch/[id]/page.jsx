import React, { cache } from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
// import { currentUser } from "@clerk/nextjs/server";

// Helper function to fetch data with force-cache and revalidate options

async function fetchAnimeSchedulesAndValidate(idToCheck) {
  const baseURL = "https://hianimes.vercel.app/anime/schedule?date=";
  const infoURL = "https://hianimes.vercel.app/anime/info?id=";
  const episURL = "https://hianimes.vercel.app/anime/episodes/";
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const formattedDate = currentDate.toISOString().split("T")[0];

    try {
      // Fetch the schedule
      const response = await fetch(`${baseURL}${formattedDate}`, {
        cache: "force-cache",
      });
      if (!response.ok) {
        console.error(`Failed to fetch schedule for ${formattedDate}`);
        continue;
      }

      const scheduleData = await response.json();

      // Check if anime ID exists in the schedule
      if (scheduleData?.scheduledAnimes) {
        for (const anime of scheduleData.scheduledAnimes) {
          if (anime.id === idToCheck) {
            const now = new Date();
            const [hour, minute] = anime.time.split(":").map(Number);
            const scheduledTime = new Date(now);
            scheduledTime.setHours(hour, minute);

            // Check if the time falls within the 30-minute window
            if (
              formattedDate === now.toISOString().split("T")[0] &&
              now >= scheduledTime &&
              now <= new Date(scheduledTime.getTime() + 30 * 60000)
            ) {
              const revalidatedResponse = await fetch(
                `${infoURL}${idToCheck}`,
                {
                  cache: "no-cache",
                }
              );
              if (revalidatedResponse.ok) {
                const animeInfo = await revalidatedResponse.json();

                // Fetch episodes for the anime
                const episodesResponse = await fetch(`${episURL}${idToCheck}`, {
                  cache: "no-cache",
                });
                const episodes = episodesResponse.ok
                  ? await episodesResponse.json()
                  : null;

                return {
                  animeInfo,
                  episodes,
                };
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(
        `Error while processing schedule for ${formattedDate}: ${error.message}`
      );
    }
  }

  // Fallback to fetching the info and episodes directly
  try {
    const fallbackResponse = await fetch(`${infoURL}${idToCheck}`, {
      cache: "force-cache",
    });
    if (fallbackResponse.ok) {
      const animeInfo = await fallbackResponse.json();

      // Fetch episodes for the anime
      const episodesResponse = await fetch(`${episURL}${idToCheck}`, {
        cache: "force-cache",
      });
      const episodes = episodesResponse.ok
        ? await episodesResponse.json()
        : null;

      return {
        animeInfo,
        episodes,
      };
    }
  } catch (error) {
    console.error(`Error fetching anime info or episodes: ${error.message}`);
  }

  return null;
}

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
    const dat = await fetchAnimeSchedulesAndValidate(params.id); // Revalidate after 1 hour
    const daty = dat.animeInfo;

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

  // Fetch the anime details
  const revalidatedData = await fetchAnimeSchedulesAndValidate(idToCheck);
  if (!revalidatedData) {
    console.error(`Failed to fetch or validate data for ID: ${idToCheck}`);
  }

  // Fetch anime info with force-cache and revalidation
  const datao = revalidatedData.animeInfo;

  // Fetch episodes with force-cache and revalidation
  const data = revalidatedData.episodes;

  // Determine the episode ID
  const epId = episodeIdParam || data?.episodes[0]?.episodeId;

  // Find the episode number
  let episodeNumber = 0;
  if (data?.episodes?.length) {
    const currentEpisode = data.episodes.find((ep) => ep.episodeId === epId);
    episodeNumber = currentEpisode ? currentEpisode.number : 0;
  }

  // Fetch stream data (real-time, no caching)
  let dataj = [];
  try {
    const respStream = await fetch(
      `https://vimalking.vercel.app/api/stream?id=${epId}`,
      { cache: "no-store" } // No cache for real-time streaming data
    );
    dataj = await respStream.json();
  } catch (error) {
    console.error("Error fetching stream data: ", error);
    dataj = [];
  }
  

  let datau = [];
  try {
    const respS = await fetch(
      `https://hianimes.vercel.app/anime/search/suggest?q=${params.id}`,
      { cache: "force-cache" }
    );
    datau = await respS.json();
  } catch (error) {
    datau = [];
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
    if (data?.episodes[i].episodeId.includes(epId)) {
      epiod = data.episodes[i].number;
    }
  }
  let gogoEP = [];
  try {
    const gogoTP = await fetch(
      `https://newgogoking.vercel.app/${datao?.anime?.info?.name}?page=1`,
      { cache: "force-cache" }
    );
    gogoEP = await gogoTP.json();
  } catch (error) {
    gogoEP = [];
  }

  const caseEP = gogoEP?.results?.length > 0 ? gogoEP.results[0]?.id : "";
  let gogoId =
    "/" +
    (
      caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
      `-dub-episode-${epiod}`
    ).replace(/[^a-zA-Z0-9\-]/g, "");
  let caseId =
    "/" +
    (
      caseEP.replace(":", "").toLocaleLowerCase().replaceAll(" ", "-") +
      `-episode-${epiod}`
    ).replace(/[^a-zA-Z0-9\-]/g, "");
  // Example data from your `datao` object

  // Example gogoData (with sub and dub information)

  let gogoSub = [];
  try {
    let gogoSC = await fetch(`https://newgogoking.vercel.app/watch/${caseId}`, {
      cache: "force-cache",
    });
    gogoSub = await gogoSC.json();
  } catch (error) {
    gogoSub = [];
  }
  console.log(gogoSub);

  let gogoDub = [];
  try {
    let gogoSC = await fetch(`https://newgogoking.vercel.app/watch/${gogoId}`, {
      cache: "force-cache",
    });
    gogoDub = await gogoSC.json();
  } catch (error) {
    gogoDub = [];
  }
  console.log("sub", gogoSub);

  let subPri = [];
  try {
    let gogoMC = await fetch(
      `https://hianimes.vercel.app/anime/episode-srcs?id=${epId}&serverId=4&category=sub`,
      {
        cache: "force-cache",
      }
    );
    subPri = await gogoMC.json();
  } catch (error) {
    subPri = [];
  }

  const subPrio = subPri && subPri.tracks ? subPri.tracks : "";

  // Fetch homepage data with force-cache and revalidation
  const datapp = await fetchDataFromAPI(
    "https://hianimes.vercel.app/anime/home",
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
