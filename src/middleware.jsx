import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

let randomIds = [];
let currentIndex = 0;

export async function middleware(request) {
  const isProtectedRoute = createRouteMatcher([
    "/user/profile(.*)",
    "/user/continue-watching(.*)",
    "/user/watch-list(.*)",
    "user/notification(.*)",
    "/user/settings(.*)",
  ]);
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
  if (request.nextUrl.pathname.startsWith("/watch")) {
    // Create a new URL object from the request URL
    const url = new URL(request.url);

    // Access search parameters
    const searchParams = url.searchParams;

    // Example: Get a specific search parameter value
    const paramValue = searchParams.get("ep");
    if (!paramValue) {
      const resp = await fetch(
        `https://aniwatch-api-8fti.onrender.com/anime/episodes/${request.nextUrl.pathname.replace(
          "/watch/",
          ""
        )}`
      );
      const data = await resp.json();
  
      return NextResponse.redirect(
        new URL(`/watch/${data.episodes[0].episodeId}`, request.url)
      );
    }
  }

  if (request.nextUrl.pathname.startsWith("/random")) {
    // If all IDs are used or not fetched yet, fetch new ones
    if (currentIndex >= randomIds.length) {
      const resp = await fetch(
        `https://aniwatch-api-8fti.onrender.com/anime/random?page=1`
      );
      const data = await resp.json();
      console.log(data)
      randomIds = data.animes.map(anime => anime.id); // Store new IDs
      currentIndex = 0; // Reset index
    }

    // Get the next ID to use
    const nextId = randomIds[currentIndex];
    currentIndex += 1; // Increment the index

    // Redirect to the next random ID
    return NextResponse.redirect(new URL(`/${nextId}`, request.url));
  }
  return clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  })(request);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
