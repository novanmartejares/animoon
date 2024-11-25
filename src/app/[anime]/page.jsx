import React from "react";
import RecommendedTopTen from "../../layouts/RecommendedTopTen";

async function fetchAnimeSchedulesAndValidate(idToCheck) {
  const baseURL = "https://hianimes.vercel.app/anime/schedule?date=";
  const infoURL = "https://hianimes.vercel.app/anime/info?id=";
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
              const revalidatedResponse = await fetch(`${infoURL}${idToCheck}`, {
                cache: "no-cache",
              });
              if (revalidatedResponse.ok) {
                return await revalidatedResponse.json();
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

  // Fallback to fetching the info directly
  try {
    const fallbackResponse = await fetch(`${infoURL}${idToCheck}`, {
      cache: "force-cache",
    });
    if (fallbackResponse.ok) {
      return await fallbackResponse.json();
    }
  } catch (error) {
    console.error(`Error fetching anime info: ${error.message}`);
  }

  return null;
}

export async function generateMetadata({ params }) {
  const respo = await fetchAnimeSchedulesAndValidate(params.anime);
  if (!respo || !respo.anime?.info) {
    return {
      title: "Anime not found - Animoon",
      description: "The requested anime could not be found.",
    };
  }

  const { name } = respo.anime.info;
  return {
    title: `Watch ${name} English Sub/Dub online free on Animoon.me`,
    description: `Animoon is the best site to watch ${name} SUB online, or you can even watch ${name} DUB in HD quality. You can also watch underrated anime on Animoon.`,
  };
}

export default async function Page({ params }) {
  const idToCheck = params.anime;

  // Fetch the anime details
  const revalidatedData = await fetchAnimeSchedulesAndValidate(idToCheck);
  if (!revalidatedData) {
    console.error(`Failed to fetch or validate data for ID: ${idToCheck}`);
  }

  // Fetch the homepage data
  let homepageData = [];
  try {
    const homepageResponse = await fetch("https://hianimes.vercel.app/anime/home");
    if (homepageResponse.ok) {
      homepageData = await homepageResponse.json();
    } else {
      console.error("Failed to fetch homepage data.");
    }
  } catch (error) {
    console.error(`Error fetching homepage data: ${error.message}`);
  }

  const ShareUrl = `https://animoon.me/${idToCheck}`;
  const arise = "this Anime";

  return (
    <div>
      <RecommendedTopTen
        uiui={revalidatedData}
        data={homepageData}
        ShareUrl={ShareUrl}
        arise={arise}
      />
    </div>
  );
}
