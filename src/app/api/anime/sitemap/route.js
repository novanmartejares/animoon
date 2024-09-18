import { NextResponse } from 'next/server';

const apiUrl = 'https://demonking-7hti.onrender.com/api/az-list?page=';
const baseUrl = 'https://animoon.me';
const watchUrl = 'https://animoon.me/watch';

// Fetch a batch of 10 pages in parallel
const fetchPagesBatch = async (startPage, endPage) => {
  const promises = [];

  for (let page = startPage; page <= endPage; page++) {
    promises.push(fetch(apiUrl + page).then(response => response.json()));
  }

  // Resolve all fetches for this batch
  const results = await Promise.all(promises);
  const urls = [];

  // Process each page's data
  results.forEach(data => {
    const dataList = data.results.data;
    dataList.forEach(item => {
      urls.push(`${baseUrl}${item.data_id}`);
      urls.push(`${watchUrl}${item.data_id}`);
    });
  });

  return urls; // Return the collected URLs for this batch
};

// Fetch data from all pages in batches of 10
const fetchAllUrls = async () => {
  let allUrls = [];
  const totalPages = 135; // Replace this with a dynamic call to getTotalPages() if necessary.

  for (let page = 1; page <= totalPages; page += 10) {
    const startPage = page;
    const endPage = Math.min(page + 9, totalPages); // Ensure we don't exceed the total page limit

    try {
      // Fetch 10 pages in parallel
      const batchUrls = await fetchPagesBatch(startPage, endPage);
      allUrls = allUrls.concat(batchUrls);

      console.log(`Fetched and processed pages ${startPage}-${endPage}`);
    } catch (error) {
      console.error(`Error fetching pages ${startPage}-${endPage}:`, error);
    }
  }

  return allUrls; // Return all URLs after fetching all pages
};

// Generate XML for the sitemap
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
    const urls = await fetchAllUrls(); // Fetch all URLs in batches of 10 pages
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
