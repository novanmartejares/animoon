import dynamic from "next/dynamic";
import React from "react";
const DynamicAZ = dynamic(() => import("@/app/AZ/az"), {
  ssr: false,
});

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Animoon , free Anime Streaming`,
    description: `Animoon is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default async function page({ params, searchParams }) {
  let json = "";
  try {
    const data = await fetch(
      `https://vimal-two.vercel.app/api/az-list/${searchParams.sort}?page=${
        searchParams.page ? searchParams.page : "1"
      }`,
      {
        cache: "no-store",
      }
    );
    json = await data.json();
  } catch (error) {
    error;
  }
  let kson = "";
  try {
    const datai = await fetch(
      `https://vimal-two.vercel.app/api/az-list?page=${
        searchParams.page ? searchParams.page : "1"
      }`,
      {
        cache: "no-store",
      }
    );
    kson = await datai.json();
  } catch (error) {
    error;
  }

  const resp = await fetch("https://aniwatch-api-8fti.onrender.com/anime/home");
  const datal = await resp.json();
  return (
    <div>
      <DynamicAZ
        el={searchParams.sort ? json : kson}
        data={datal}
        sort={searchParams.sort}
        page={searchParams.page}
        para={params.id}
      />
    </div>
  );
}
