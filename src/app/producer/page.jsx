import React from "react";
import GenreSidebar from "@/app/Gridle/page";

// SEO Metadata generation
export async function generateMetadata({ searchParams }) {
  const name = searchParams.name || "Anime"; // Ensure 'name' exists

  return {
    title: `Watch ${name} Anime English Sub/Dub online free on Animoon.me`,
    description: `Animoon is the best site to watch ${name} Anime SUB online, or you can even watch ${name} Anime DUB in HD quality. You can also watch underrated anime on Animoon website.`,
  };
}

// Main component
export default async function Producer({ searchParams }) {
  const producerName = searchParams.name?.toString() || "default-producer"; // Ensure the name is valid
  const formattedProducerName = producerName
    .replaceAll(" ", "-")
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9\-]/g, ""); // Clean up the producer name for the URL

  const pageParam = searchParams.page || '1'; // Default to page 1 if not provided
  const cacheMaxAge = 345600; // Cache data for 4 days (in seconds)

  try {
    // Fetch producer-specific anime list and homepage data concurrently
    const [producerResp, homeResp] = await Promise.all([
      fetch(`https://aniwatch-api-8fti.onrender.com/anime/producer/${formattedProducerName}?page=${pageParam}`, {
        cache: "force-cache",
        headers: {
          "Cache-Control": `public, max-age=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge}`,
        },
      }),
      fetch("https://aniwatch-api-8fti.onrender.com/anime/home", {
        cache: "force-cache",
        headers: {
          "Cache-Control": `public, max-age=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge}`,
        },
      }),
    ]);

    if (!producerResp.ok || !homeResp.ok) {
      throw new Error("Failed to fetch data.");
    }

    const producerData = await producerResp.json();
    const homeData = await homeResp.json();

    // Construct the shareable URL
    const ShareUrl = `https://animoon.me/producer?name=${producerName}`;
    const title = `${producerName} Anime`;

    return (
      <div>
        <GenreSidebar
          data={producerData}
          name={producerName}
          dev={formattedProducerName}
          datal={homeData}
          ShareUrl={ShareUrl}
          arise={title}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
