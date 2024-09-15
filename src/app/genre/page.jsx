import GenreSidebar from "@/app/Gridle/page";
import React from "react";

export async function generateMetadata({ searchParams }) {
  const idd = searchParams.name;

  return {
    title: `Watch ${idd} Anime English Sub/Dub online free on Animoon.me`,
    description: `Animoon is the best site to watch
                        ${idd} Anime SUB online, or you can even
                        watch ${idd} Anime DUB in HD quality. You
                        can also watch under rated anime
                        on Animoon website.`,
  };
}

export default async function page({ searchParams }) {
  const cate = searchParams.name.toString();
  const date = searchParams.name
    .toString()
    .replaceAll(" ", "-")
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9\-]/g, "");
  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/genre/${date}?page=${searchParams.page ? searchParams.page : '1'}`
  );
  const data = await resp.json();

  const respl = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/home"
  );
  const datal = await respl.json();
  const ShareUrl = `https://animoon.me/genre?id=${cate}&name=${cate}`;

  const arise = `${cate} Anime`;

  return (
    <div>
      <GenreSidebar
        data={data}
        name={cate}
        cate={cate}
        datal={datal}
        ShareUrl={ShareUrl}
        page={searchParams.page}
        arise={arise}
      />
    </div>
  );
}
