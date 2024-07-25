import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req) {
  const user = await currentUser();
  return NextResponse.json(user);
}

export const revalidate = 0;
