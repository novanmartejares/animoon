import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/watchi")) {
    const resp = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/episodes/${request.nextUrl.pathname.replace(
        "/watchi/",
        ""
      )}`
    );
    const data = await resp.json();

    return NextResponse.redirect(
      new URL(`/watch/${data.episodes[0].episodeId}`, request.url)
    );
  }
  if (request.nextUrl.pathname.startsWith("/random")) {
    const resp = await fetch(
      `https://aniwatch-api-8fti.onrender.com/anime/random?page=1`
    );
    const data = await resp.json();

    return NextResponse.redirect(new URL(`/${data.animes[0].id}`, request.url));
  }
  return clerkMiddleware()(request);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
