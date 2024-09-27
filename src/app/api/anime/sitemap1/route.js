import { NextResponse } from "next/server";

const apiUrl = "https://vimalking.vercel.app/api/az-list?page=";
const baseUrl = "https://animoontv.vercel.app";

// Helper function for retrying fetch in case of error
const retryFetch = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
      return await response.json(); // Return the parsed JSON if successful
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed for ${url}:`, error);
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
      } else {
        throw error; // Rethrow error after final retry
      }
    }
  }
};

// Fetch total number of pages from the first request
const getTotalPages = async () => {
  const data = await retryFetch(apiUrl + "1"); // Fetch the first page with retry logic
  return data.results.totalPages; // Return the total number of pages
};

// Fetch a batch of 10 pages in parallel
const fetchPagesBatch = async (startPage, endPage) => {
  const promises = [];

  for (let page = startPage; page <= endPage; page++) {
    promises.push(retryFetch(apiUrl + page)); // Use retryFetch to handle errors
  }

  // Resolve all fetches for this batch
  const results = await Promise.all(promises);
  const urls = [];

  // Process each page's data
  results.forEach((data) => {
    const dataList = data.results.data;
    dataList.forEach((item) => {
      urls.push(`${baseUrl}${item.data_id}`);
    });
  });

  return urls; // Return the collected URLs for this batch
};

// Fetch data from all pages in batches of 10
const fetchAllUrls = async () => {
  let allUrls = [];
  const totalPages = await getTotalPages(); // Dynamically get total number of pages

  for (let page = 20; page <= 40; page += 10) {
    const startPage = page;
    const endPage = Math.min(page + 9, 40); // Ensure we don't exceed the total page limit

    try {
      // Fetch 10 pages in parallel with retry logic
      const batchUrls = await fetchPagesBatch(startPage, endPage);
      allUrls = allUrls.concat(batchUrls);

      console.log(`Fetched and processed pages ${startPage}-${endPage}`);
    } catch (error) {
      console.error(`Error fetching pages ${startPage}-${endPage}:`, error);
    }
  }

  return allUrls; // Return all URLs after fetching all pages
};

// Helper function to escape XML characters
const escapeXml = (url) => {
  return url
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

// Generate XML for the sitemap
const generateSitemap = (urls) => {
  const lastModifiedDate = new Date().toISOString(); // Get the current date in ISO format
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map((url) => {
          const escapedUrl = escapeXml(url); // Escape the URL before adding it to the XML
          return `
          <url>
            <loc>${escapedUrl}</loc>
            <lastmod>${lastModifiedDate}</lastmod> <!-- Add lastmod element -->
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>
        `;
        })
        .join("")}
    </urlset>`;
};

// API Route handler for sitemap
export async function GET() {
  try {
    const urls = await fetchAllUrls(); // Fetch all URLs from pages
    const allUrls = [baseUrl, ...urls]; // Include baseUrl and merge all URLs

    const sitemap = generateSitemap(allUrls); // Generate the sitemap with all URLs

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
