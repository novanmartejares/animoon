import axios from "axios";
import { redis } from "@/lib/rediscache";
import { NextResponse } from "next/server";

// Set a timeout of 9 seconds for all axios requests
axios.interceptors.request.use((config) => {
  config.timeout = 9000;
  return config;
});

// Function to fetch recent episodes from the API
async function fetchRecent() {
  try {
    const { data } = await axios.get(
      `https://aniwatch-api-8fti.onrender.com/anime/home`
    );
    return data;
  } catch (error) {
    console.error("Error fetching Recent Episodes:", error);
    return null; // Return null if there's an error
  }
}

export async function GET(req) {
  let cached;

  // Check if Redis is available and attempt to retrieve cached data
  if (redis) {
    console.log("using redis");
    cached = await redis.get(`anime-omi`);
  }

  // If cached data is available and not empty, return it
  if (cached && JSON.parse(cached) && JSON.parse(cached).length > 0) {
    return NextResponse.json(JSON.parse(cached));
  } else {
    // Fetch data from the API if no cached data is available or if it's empty
    const data = await fetchRecent();

    // If data is fetched successfully and is not an empty array, cache and return it
    if (data && data.length > 0) {
      if (redis) {
        await redis.set(`anime-omi`, JSON.stringify(data), "EX", 3600);
      }
      return NextResponse.json(data);
    } else {
      // Handle cases where the data is empty or not fetched
      return NextResponse.json({ message: "Recent Episodes not found" });
    }
  }
}
