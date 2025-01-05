import React from "react";
import Nav from "@/app/Nav/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navic({ children }) {
  const session = await getServerSession(authOptions);

  // console.log(session.user)
  let data = [];

  try {
    const resp = await fetch(`https://hianimes.animoon.me/anime/random?page=1`, {
      next: { revalidate: 60 },
    });

    if (!resp.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    data = await resp.json();

    // Proceed with further processing of the `data` if needed
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Handle the error (e.g., show a user-friendly message or retry logic)
  }

  return (
    <div>
      <Nav session={session} children={children} data={data} />
    </div>
  );
}
