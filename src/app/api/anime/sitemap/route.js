import { NextResponse } from 'next/server';

const apiUrl = 'https://demonking-7hti.onrender.com/api/az-list?page=';
const baseUrl = 'https://animoon.me';
const watchUrl = 'https://animoon.me/watch';

// Fetch total number of pages
const getTotalPages = async () => {
  const response = await fetch(apiUrl + '1');
  const data = await response.json();
  return data.results.totalPages; // Correctly accessing totalPages from the fetched JSON
};

// Fetch data from one page, process its IDs, then move to the next page
const fetchUrlsSequentially = async () => {
  const totalPages = await getTotalPages();
  let allUrls = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      // Fetch one page at a time
      const response = await fetch(apiUrl + page);
      const data = await response.json(); // Parse JSON

      const dataList = data.results.data; // Get the list of items

      // Process IDs from the current page
      dataList.forEach((item) => {
        allUrls.push(`${baseUrl}${item.data_id}`); // Example: https://animoon.me/jx-online-3-the-adventure-of-shen-jianxin-3rd-season-19064
        allUrls.push(`${watchUrl}${item.data_id}`); // Example: https://animoon.me/watch/jx-online-3-the-adventure-of-shen-jianxin-3rd-season-19064
      });

      console.log(`Fetched and processed page ${page}/${totalPages}`);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      // Optionally handle retries here if needed
    }
  }

  return allUrls; // Return all URLs after fetching all pages
};

// Generate XML for sitemap
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
        </url>
      `;
      })
      .join('')}
  </urlset>`;
};

// API Route handler for sitemap
export async function GET() {
  try {
    const urls = await fetchUrlsSequentially(); // Fetch all URLs one page at a time
    const sitemap = generateSitemap(urls); // Generate the sitemap

    // Return sitemap with appropriate headers
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
