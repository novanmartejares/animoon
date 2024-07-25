// pages/api/sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://animoon.me/'; // Replace with your base URL

const fetchAnimeData = async () => {
  const endpoints = [
    'https://aniwatch-api-8fti.onrender.com/anime/home',
    'https://aniwatch-api-8fti.onrender.com/anime/search?q=&page=1',
    'https://aniwatch-api-8fti.onrender.com/anime/genre/%7Bname%7D?page=1',
    'https://aniwatch-api-8fti.onrender.com/anime/%7Bcategory%7D?page=1'
  ];

  const requests = endpoints.map(url => axios.get(url));
  const responses = await Promise.all(requests);

  // Extract data from responses
  const homeData = responses[0].data;
  const searchData = responses[1].data.results; // Adjust if the structure is different
  const genreData = responses[2].data.results; // Adjust if the structure is different
  const categoryData = responses[3].data.results; // Adjust if the structure is different

  return { homeData, searchData, genreData, categoryData };
};

export default async function handler(req, res) {
  const { homeData, searchData, genreData, categoryData } = await fetchAnimeData();

  const sitemap = new SitemapStream({ hostname: BASE_URL });

  // Add static pages
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });

  // Add dynamic pages
  homeData.forEach(anime => {
    sitemap.write({ url: `/watch/${anime.id}`, changefreq: 'daily', priority: 0.8 });
  });

  searchData.forEach(anime => {
    sitemap.write({ url: `/search/${anime.id}`, changefreq: 'daily', priority: 0.8 });
  });

  genreData.forEach(anime => {
    sitemap.write({ url: `/genre/${anime.id}`, changefreq: 'daily', priority: 0.8 });
  });

  categoryData.forEach(anime => {
    sitemap.write({ url: `/category/${anime.id}`, changefreq: 'daily', priority: 0.8 });
  });

  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.send(sitemapBuffer.toString());
}
