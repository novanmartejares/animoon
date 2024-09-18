// app/api/sitemap/route.js
import axios from "axios";
import { NextResponse } from "next/server";

// Define base API and URL constants
const apiUrl = "https://demonking-7hti.onrender.com/api/az-list?page=";
const baseUrl = "https://animoon.me";
const watchUrl = "https://animoon.me/watch";

// Function to fetch the total number of pages from the API
const getTotalPages = async () => {
  const response = await axios.get(apiUrl + "1");
  return response.data.results.totalPages; // Correct access to totalPages
};

// Function to fetch all URLs by looping through pages
const fetchAllUrls = async () => {
  const totalPages = await getTotalPages(); // Get total pages
  let allUrls = [];

  // Loop through each page to fetch data
  for (let page = 1; page <= totalPages; page++) {
    const response = await axios.get(apiUrl + page);
    const dataList = response.data.results.data; // Correctly access data from the response

    // Generate URLs for each item in the data list
    dataList.forEach((item) => {
      allUrls.push(`${baseUrl}${item.data_id}`); // Generate the base URL
      allUrls.push(`${watchUrl}${item.data_id}`); // Generate the watch URL
    });
  }

  return allUrls; // Return all generated URLs
};

// Function to generate XML sitemap
const generateSitemap = (urls) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((url) => {
        return `
        <url>
          <loc>${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("")}
  </urlset>`;
};

// API route handler for generating the sitemap
export async function GET() {
  try {
    const urls = await fetchAllUrls(); // Fetch all URLs
    const sitemap = generateSitemap(urls); // Generate the sitemap in XML format

    // Return sitemap with appropriate headers
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
