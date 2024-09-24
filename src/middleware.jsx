import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

let randomIds = [];
let currentIndex = 0;

export async function middleware(request) {
  const isProtectedRoute = createRouteMatcher([
    "/user/profile(.*)",
    "/user/continue-watching(.*)",
    "/user/watch-list(.*)",
    "/user/notification(.*)",
    "/user/settings(.*)",
  ]);

  // Handling the /watchi route
  if (request.nextUrl.pathname.startsWith("/watchi")) {
    const resp = await fetch(
      `https://hianimes.vercel.app/anime/episodes/${request.nextUrl.pathname.replace(
        "/watchi/",
        ""
      )}`
    );
    const data = await resp.json();

    return NextResponse.redirect(
      new URL(`/watch/${data.episodes[0].episodeId}`, request.url),
      301 // 301 redirect for /watchi
    );
  }

  // Handling the /watch route
  if (request.nextUrl.pathname.startsWith("/watch")) {
    const url = new URL(request.url);
    const episodeId = url.searchParams.get("ep");
    const animeId = request.nextUrl.pathname.replace("/watch/", "");

    // If the 'ep' query parameter exists, serve the page without redirecting
    if (episodeId) {
      return NextResponse.next(); // No redirect needed, serve the page
    }

    // If the 'ep' query parameter is missing, fetch the first episode and redirect
    const resp = await fetch(
      `https://hianimes.vercel.app/anime/episodes/${animeId}`
    );

    if (!resp.ok) {
      return new NextResponse('Error fetching episode data', { status: 500 });
    }

    const data = await resp.json();
    // Redirect to the first episode using a 301 redirect
    return NextResponse.redirect(
      new URL(`/watch/${animeId}?ep=${data.episodes[0].episodeId}`, request.url),
      301 // 301 redirect for missing ep parameter
    );
  }

  // Handling the /random route
  if (request.nextUrl.pathname.startsWith("/random")) {
    // If all IDs are used or not fetched yet, fetch new ones
    if (currentIndex >= randomIds.length) {
      const resp = await fetch(
        `https://hianimes.vercel.app/anime/random?page=1`,
        { cache: "no-store" }
      );
      const data = await resp.json();
      console.log(data);
      randomIds = data.animes.map((anime) => anime.id); // Store new IDs
      currentIndex = 0; // Reset index
    }

    // Get the next ID to use
    const nextId = randomIds[currentIndex];
    currentIndex += 1; // Increment the index

    // Redirect to the next random ID
    return NextResponse.redirect(new URL(`/${nextId}`, request.url), 301); // 301 redirect for random IDs
  }

  // Protecting routes with Clerk middleware
  return clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  })(request);
}

// Config for the routes
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
