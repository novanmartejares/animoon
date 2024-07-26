import "./page.css";
import errorP from "../../../public/error.gif";
import Image from "next/image";

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

export default function Error() {
  return (
    <div
      style={{ marginTop: "65px" }}
      className="gogoanime-error d-flex-fd-column a-center j-center"
    >
      <Image className="imago" src={errorP} alt="error" />
      <h2 className="hji">Page is under Construction ...</h2>
    </div>
  );
}
