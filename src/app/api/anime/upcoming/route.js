import axios from "axios";
import { redis } from "@/lib/rediscache";
import { NextResponse } from "next/server";

axios.interceptors.request.use((config) => {
  config.timeout = 9000;
  return config;
});

async function fetchRecent() {
  try {
    const { data } = await axios.get(
      `https://api-aniwatch.onrender.com/anime/top-upcoming?page=1`
    );
    return data;
  } catch (error) {
    console.error("Error fetching Recent Episodes:", error);
    return [];
  }
}

export async function GET(req) {
  let cached;
  if (redis) {
    console.log("using redis");
    cached = await redis.get("top-upcoming");
  }
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  } else {
    const data = await fetchRecent();
    if (data) {
      if (redis) {
        await redis.set("top-upcoming", JSON.stringify(data), "EX", 18000);
      }
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: "Recent Episodes not found" });
    }
  }
}
