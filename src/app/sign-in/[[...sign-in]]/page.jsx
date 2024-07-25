import { SignIn } from "@clerk/nextjs";
import "./signIn.css";

export async function generateMetadata() {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Animoon.me , free Anime Streaming`,
    description: `Animoom is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}

export default function Page() {
  return (
    <>
      <div className="sgnin">
        <SignIn />
      </div>
    </>
  );
}
