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

  const { pathname } = request.nextUrl;

  // Handle redirect for /watch2gether path
  if (!pathname.startsWith("/watch2gether")) {
    
    if (pathname.startsWith("/watch") || pathname.startsWith("/watchi")) {
      const animeId = pathname.replace(/\/watchi?\//, ""); // Handle both /watch and /watchi
      
      const resp = await fetch(`https://hianimes.vercel.app/anime/episodes/${animeId}`);
      const data = await resp.json();

      if (!data.episodes || data.episodes.length === 0) {
        return NextResponse.error(new URL(`/404`, request.url)); // Handle missing episodes
      }

      // Handle search parameter for episode
      const url = new URL(request.url);
      const paramValue = url.searchParams.get("ep");

      if (!paramValue) {
        return NextResponse.redirect(
          new URL(`/watch/${data.episodes[0].episodeId}`, request.url),
          301
        );
      }
    }
  }

  // Handle random anime redirection
  if (pathname.startsWith("/random")) {
    if (currentIndex >= randomIds.length) {
      const resp = await fetch(`https://hianimes.vercel.app/anime/random?page=1`, {
        cache: "no-store",
      });
      const data = await resp.json();
      if (!data.animes || data.animes.length === 0) {
        return NextResponse.error(new URL(`/404`, request.url)); // Handle missing random anime data
      }

      randomIds = data.animes.map((anime) => anime.id); // Store new random IDs
      currentIndex = 0;
    }

    const nextId = randomIds[currentIndex];
    currentIndex += 1;
    return NextResponse.redirect(new URL(`/${nextId}`, request.url), 301);
  }

  // Protect user routes with Clerk middleware
  return clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  })(request);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
