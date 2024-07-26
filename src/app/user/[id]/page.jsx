import React from "react";
import Slab from "@/component/Slab/Slab";
import { currentUser } from "@clerk/nextjs/server";
import Profito from "@/component/Profito/Profito";
import MyComponent from "@/component/ContinueWatching/ContinueWatching";
import WatchList from "@/component/WatchList/WatchList";
import Settings from "@/component/Settings/Settings";
import Notification from "@/component/Notification/Notification"

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Kaidox.xyz ( kaido.to | kaidoanime.netlify.app | kaido ) , free Anime Streaming`,
    description: `KaidoX ( Kaido ) is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on KaidoX ( Kaido ) website.`,
  };
}


export default async function page({ params, searchParams }) {
  const param = params.id;
  const slabId = param.replace("-", " ");
  const user = await currentUser();
  const firstName = user?.firstName;
  const imageUrl = user?.imageUrl;
  const emailAdd = user?.emailAddresses[0].emailAddress;
  const joined = user?.createdAt;

  return (
    <>
      <div>
        <Slab slabId={slabId} firstName={firstName} imageUrl={imageUrl} />
      </div>
      {param === "profile" ? (
        <Profito
          emailAdd={emailAdd}
          firstName={firstName}
          joined={joined}
          imageUrl={imageUrl}
        />
      ) : (
        ""
      )}
      {param === "continue-watching" ? <MyComponent /> : ""}
      {param === "watch-list" ? <WatchList type={searchParams.type} /> : ""}
      {param === "settings" ? <Settings /> : ""}
      {param === "notification" ? <Notification/> : ""}
    </>
  );
}
