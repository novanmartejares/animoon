import {NextResponse } from "next/server";

export async function GET(
  req,
  { params }
) {
  const episode = await fetch(`https://newgogo.vercel.app/watch/${params.id}`);
  return NextResponse.json(episode);
}
 
export const revalidate = 0