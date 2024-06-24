import { NextResponse } from "next/server";


export async function GET(
  req,
  { params }
) {
  const resp = await fetch(
    `https://aniwatch-api-8fti.onrender.com/anime/search/suggest?q=${params.id}`
  );
  const data = await resp.json();
  console.log(data);
  return NextResponse.json(data);
}
 
export const revalidate = 18000