import mysql from "mysql2/promise";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const episodeNumber = searchParams.get("ep"); // Fetch the `ep` parameter

  if (!id || !episodeNumber) {
    return new Response(
      JSON.stringify({ error: "Both ID and episode number are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const connection = await mysql.createConnection({
      host: "145.223.118.168", // Replace with your VPS IP or hostname
      user: "king", // Replace with your MySQL username
      password: "Imperial_king2004", // Replace with your MySQL password
      database: "my_database", // Replace with your MySQL database name
    });

    // Query to fetch episode data for specific providers
    const [rows] = await connection.execute(
      `SELECT * FROM episodes 
       WHERE anime_id = ? 
       AND episode_number = ? 
       AND provider IN ('roro', 'vibe', 'zaza', 'shashh')`,
      [id, episodeNumber]
    );

    await connection.end();

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "No episode found for the given ID and episode number from the specified providers" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ data: [ rows[0] , rows[1] , rows[2] ,rows[3]]}), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
