import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Nav from "@/app/Nav/Nav";


export default async function Navic({ children }) {
  const user = await currentUser();
  const firstName = user?.firstName;
  const imageUrl = user?.imageUrl;
  const emailAdd = user?.emailAddresses[0].emailAddress;
  return (
    <div>
      <Nav
        children={children}
        firstName={firstName}
        imageUrl={imageUrl}
        emailAdd={emailAdd}
      />
    </div>
  );
}
