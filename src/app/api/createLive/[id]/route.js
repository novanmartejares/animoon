// app/api/message/[id]/route.js

import cache from '@/lib/cache.js'; // Import your cache instance

// Handle POST request
export async function POST(req, { params }) {
  const { id } = params; // Extract the ID from the dynamic URL
  const body = await req.json(); // Parse the request body
  const { data } = body;

  // Validate if the data is an object
  if (!data || typeof data !== 'object') {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid data' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Generate a cache key using the ID
  const key = `message:${id}`; // Cache key will be unique for each id
  cache.set(key, data); // Cache permanently

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Handle GET request
export async function GET(req, { params }) {
  const { id } = params; // Extract the ID from the dynamic URL

  // Generate a cache key using the ID
  const key = `message:${id}`; // Cache key will be unique for each id

  // Retrieve the cached object
  const cachedObject = cache.get(key) || 'No cached data';

  return new Response(JSON.stringify({ data: cachedObject }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
