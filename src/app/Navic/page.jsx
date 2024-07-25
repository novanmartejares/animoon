import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import React from "react";
const DynamicNav = dynamic(() => import("@/app/Nav/Nav"), {
  ssr: false,
});

export default async function page({ children }) {
  const user = await currentUser();
  const firstName = user?.firstName;
  const imageUrl = user?.imageUrl;
  const emailAdd = user?.emailAddresses[0].emailAddress;
  return (
    <div>
      <DynamicNav
        children={children}
        firstName={firstName}
        imageUrl={imageUrl}
        emailAdd={emailAdd}
      />
    </div>
  );
}
