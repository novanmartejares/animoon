import { NextResponse } from 'next/server';

const apiUrl = 'https://demonking-7hti.onrender.com/api/az-list?page=';
const baseUrl = 'https://animoon.me';
const watchUrl = 'https://animoon.me/watch';

const fetchPagesBatch = async (startPage, endPage) => {
  const promises = [];
  for (let page = startPage; page <= endPage; page++) {
    promises.push(fetch(apiUrl + page).then(response => response.json()));
  }

  const results = await Promise.all(promises);
  const urls = [];
  results.forEach(data => {
    const dataList = data.results.data;
    dataList.forEach(item => {
      urls.push(`${baseUrl}${item.data_id}`);
      urls.push(`${watchUrl}${item.data_id}`);
    });
  });
  return urls;
};

const fetchAllUrls = async () => {
  let allUrls = [];
  const totalPages = 135; // or dynamically get totalPages if possible
  for (let page = 1; page <= totalPages; page += 10) {
    const startPage = page;
    const endPage = Math.min(page + 9, totalPages);
    const batchUrls = await fetchPagesBatch(startPage, endPage);
    allUrls = allUrls.concat(batchUrls);
  }
  return allUrls;
};

const generateSitemap = (urls) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `
      <url>
        <loc>${url}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('')}
  </urlset>`;
};

export async function GET() {
  try {
    const urls = await fetchAllUrls();
    const sitemap = generateSitemap(urls);
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
