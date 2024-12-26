import React from "react";

export default async function page() {
  const resp = await fetch(
    `http://localhost:3000/api/createLive/5hk4nGxEH1tdZAWtvc2G`,
    {
      method: "GET",
    }
  );
  const rest = await resp.json();

  console.log(rest);
  return <div>{JSON.stringify(rest)}</div>;
}
