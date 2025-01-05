import React from "react";
import CreateLive from "../../../component/CreateLive/CreateLive";
import LivePage from "../../../component/LivePage/LivePage";
import axios from "axios";
import * as cheerio from "cheerio";

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
  let dataStr = { sub: [], dub: [] }; // Separate arrays for sub and dub URLs
  if (searchParams.anId) {
    const epis = searchParams.ep;
    const episodeIdParam = epis ? `${params.id}?ep=${epis}` : null;

    const resp = await fetch(
      `https://hianimes.animoon.me/anime/info?id=${searchParams.anId}`,
      { next: { revalidate: 3600 } }
    );
    datal = await resp.json();

    const respo = await fetch(
      `https://hianimes.animoon.me/anime/episodes/${searchParams.anId}`,
      { next: { revalidate: 3600 } }
    );
    dataEpi = await respo.json();

    // Determine the episode ID
    const epId = episodeIdParam || dataEpi?.episodes[0]?.episodeId;

    try {
      // Step 1: Fetch the server list for the episode
      const episodeId = epis
        ? epis
        : dataEpi?.episodes[0].episodeId.split("ep=")[1];
      const serversResponse = await axios.get(
        `https://hianime.to/ajax/v2/episode/servers?episodeId=${episodeId}`
      );
      const serversData = serversResponse.data;

      if (serversData?.html) {
        const $ = cheerio.load(serversData.html);

        // Extract SUB and DUB server data
        ["sub", "dub"].forEach((type) => {
          $(`div.ps_-block-sub.servers-${type} div.server-item`).each(
            (_, element) => {
              const dataId = $(element).attr("data-id");
              if (dataId) {
                dataStr[type].push({ id: dataId, url: null }); // Initialize URL as null
              }
            }
          );
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
                console.error(
                  `Error fetching sources for server ID ${server.id}:`,
                  err.message
                );
              }
            })
          );
        }

        // console.log("Extracted EA URLs:", dataStr);
      } else {
        console.error("Invalid servers response or missing HTML.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  console.log(dataStr);
  return (
    <div>
      {searchParams.animeId ? (
        <CreateLive data={data} />
      ) : (
        <LivePage
          datal={datal}
          dataEpi={dataEpi}
          dataStr={dataStr}
          id={params.id}
        />
      )}
    </div>
  );
}
