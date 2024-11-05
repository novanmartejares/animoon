import React from "react";
import Nav from "@/app/Nav/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navic({ children }) {
  const session = await getServerSession(authOptions);

  const resp = await fetch(`https://hianimes.vercel.app/anime/random?page=1`, {
    cache: "no-store",
  });
  const data = await resp.json();
  return (
    <div>
      <Nav session={session} children={children} data={data}/>
    </div>
  );
}
