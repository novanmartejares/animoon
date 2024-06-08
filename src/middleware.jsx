import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/watchi")) {
    console.log(request.nextUrl.pathname.replace("/watchi/", ""));

    const resp = await fetch(
      `https://api-aniwatch.onrender.com/anime/episodes/${request.nextUrl.pathname.replace(
        "/watchi/",
        ""
      )}`
    );
    const data = await resp.json();
    console.log(request.nextUrl.searchParams);

    return NextResponse.redirect(new URL(`/watch/${data.episodes[0].episodeId}`, request.url))
  }
}
