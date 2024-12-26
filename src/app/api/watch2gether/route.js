import cache from "@/lib/cache.js"; // Import your cache instance

// Cache key for storing the array
const WATCH2GETHER_KEY = "watch2gether:all";

// Handle POST request: Add a new object to the array
export async function POST(req) {
  const body = await req.json();
  const { data } = body;

  // Validate if the data is an object
  if (!data || typeof data !== "object") {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid data" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Retrieve the current array from the cache
  const currentArray = cache.get(WATCH2GETHER_KEY) || [];

  // Ensure the object has a unique ID
  data.id = data.id || `obj-${Date.now()}`;

  // Add the new object to the array
  currentArray.push(data);

  // Save the updated array back to the cache
  cache.set(WATCH2GETHER_KEY, currentArray);

  return new Response(JSON.stringify({ success: true, data: currentArray }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Handle GET request: Retrieve the entire array
export async function GET() {
  const currentArray = cache.get(WATCH2GETHER_KEY) || [];
  return new Response(JSON.stringify({ data: currentArray }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Handle PUT request: Update a specific object in the array
export async function PUT(req) {
  const body = await req.json();
  const { id, updates } = body;

  // Validate the input
  if (!id || typeof updates !== "object") {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid id or updates" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Retrieve the current array from the cache
  const currentArray = cache.get(WATCH2GETHER_KEY) || [];

  // Find the index of the object to update
  const objIndex = currentArray.findIndex((obj) => obj.id === id);

  if (objIndex === -1) {
    return new Response(
      JSON.stringify({ success: false, error: "Object not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Update the object with the new values
  currentArray[objIndex] = { ...currentArray[objIndex], ...updates };

  // Save the updated array back to the cache
  cache.set(WATCH2GETHER_KEY, currentArray);

  return new Response(
    JSON.stringify({ success: true, data: currentArray[objIndex] }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

// Handle DELETE request: Remove a specific object by ID
export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Retrieve the current array from the cache
  const currentArray = cache.get(WATCH2GETHER_KEY) || [];

  // Filter out the object with the given ID
  const updatedArray = currentArray.filter((obj) => obj.id !== id);

  if (updatedArray.length === currentArray.length) {
    return new Response(
      JSON.stringify({ success: false, error: "Object not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Save the updated array back to the cache
  cache.set(WATCH2GETHER_KEY, updatedArray);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
