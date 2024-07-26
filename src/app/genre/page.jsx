import dynamic from "next/dynamic";
import React from "react";
const DynamicCate = dynamic(() => import("@/app/Gridle/page"), {
  ssr: false,
});

export async function generateMetadata({ searchParams }) {
  const idd = searchParams.name;

  return {
    title: `Watch ${idd} Anime English Sub/Dub online free on Kaidox.xyz ( kaido.to | kaidoanime.netlify.app | kaido )`,
    description: `KaidoX ( Kaido ) is the best site to watch
                        ${idd} Anime SUB online, or you can even
                        watch ${idd} Anime DUB in HD quality. You
                        can also watch under rated anime
                        on KaidoX ( Kaido ) website.`,
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
    `https://aniwatch-api-8fti.onrender.com/anime/genre/${date}?page=1`
  );
  const data = await resp.json();

  const respl = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/home"
  );
  const datal = await respl.json();
  const ShareUrl = `https://kaidox.xyz/genre?id=${cate}&name=${cate}`;

  const arise = `${cate} Anime`;

  return (
    <div>
      <DynamicCate
        data={data}
        name={cate}
        datal={datal}
        ShareUrl={ShareUrl}
        arise={arise}
      />
    </div>
  );
}
