import React from "react";
import WatchAnime from "../../WatchAnime/WatchAnime";
import { currentUser } from "@clerk/nextjs/server";

export async function generateMetadata({ params }) {
  
  const respo = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/info?id=${params.id}`,
    { next: { revalidate: 60 } }
  );
  const daty = await respo.json();
  return {
    title: `Watch ${daty.anime.info.name} English Sub/Dub online free on Animoon.me`,
    description: `Animoon is the best site to watch
                      ${daty.anime.info.name} SUB online, or you can even
                      watch ${daty.anime.info.name} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default async function page({ params, searchParams }) {

  const user = await currentUser();
  const firstName = user?.firstName;
  const userName = user?.username;
  const imageUrl = user?.imageUrl;
  const emailAdd = user?.emailAddresses[0].emailAddress;

  const epis = searchParams.ep;

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

  let epiod = 0;
  let i = 0;
  for (i > 0; i < data.episodes.length; i++) {
    if (data?.episodes[i].episodeId === epId) {
      epiod = data.episodes[i].number;
    }
  }

  let dataj = [];
  try {
    const respS = await fetch(
      `https://demonking-7hti.onrender.com/api/stream?id=${epId}`,
      { cache: "no-store" }
    );
    dataj = await respS.json();
  } catch (error) {
    dataj = [];
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

  return (
    <div>
      <WatchAnime
        data={data}
        anId={params.id}
        datao={datao}
        epiod={epiod}
        epId={epId}
        epis={epis}
        dataj={dataj}
        datapp={datapp}
        ShareUrl={ShareUrl}
        arise={arise}
        firstName={firstName}
        userName={userName}
        imageUrl={imageUrl}
        emailAdd={emailAdd}
      />
    </div>
  );
}
