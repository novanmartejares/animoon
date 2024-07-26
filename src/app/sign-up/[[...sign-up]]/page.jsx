import { SignUp } from "@clerk/nextjs";
import "./signUp.css";

export async function generateMetadata() {
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

export default function Page() {
  return (
    <>
      <div className="sgnup">
        <SignUp />
      </div>
    </>
  );
}
