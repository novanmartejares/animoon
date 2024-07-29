import React from "react";
import dynamic from "next/dynamic";
const DynamicCate = dynamic(() => import("@/app/Gridle/page"), {
  ssr: false,
});

// https://just-cub-0.clerk.accounts.dev/v1/client/handshake?redirect_url=https%3A%2F%2Fanimoon.me%2Fuser%2Fprofile&__clerk_db_jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmpqb1VqWVhtNjFLSVJzVTh1VGVrcHcyMWRRIn0.kxMOQMIykXfTs-n7Fj5E-UfRvzAUynyIt-jKXQP1mxBcppIOOhEkHk28oWXzdRbek71R6P684n5uYtfCbXMDPg4h-OGKIvYJpvMIODkoYXwCSCYVFSMysUU-omskF60LWsYSbhLQq1Ppzv-7dhTbQMwRhMtSM8c87douEYOh5dWh-unZqIAvV1Err5M1KHaSp3QiL0Qw5MMtSYIeQxvhftoH2NaT8X3Fl6IuUMxiGqIKT8y8nuM1rhbowfi6NG2QYiYu85kz9j9Ni-GBS2LKYbFCzLBUF2ok4ifqj8lEjCeDUNiGZ16j9aIjVJ2Cvq5gLfkB0yyLBKrwr7OR4BvdSg

export async function generateMetadata({ searchParams }) {
  return {
    title: `Watch ${searchParams.name} Anime English Sub/Dub online free on Animoon.me`,
    description: `Animoon is the best site to watch
                      ${searchParams.name} Anime SUB online, or you can even
                      watch ${searchParams.name} Anime DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default async function Producer({ searchParams }) {
  const fiki = searchParams.name;
  const hiki = searchParams.name
    .toString()
    .replaceAll(" ", "-")
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9\-]/g, "");
  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/producer/${hiki}?page=1`
  );
  const data = await resp.json();
  console.log(data);
  const respl = await fetch(
    "https://aniwatch-api-8fti.onrender.com/anime/home"
  );
  const datal = await respl.json();

  const ShareUrl = `https://animoon.me/producer?name=${fiki}`;

  const arise = `${fiki} Anime`;

  return (
    <div>
      <DynamicCate
        data={data}
        name={fiki}
        dev={hiki}
        datal={datal}
        ShareUrl={ShareUrl}
        arise={arise}
      />
    </div>
  );
}
