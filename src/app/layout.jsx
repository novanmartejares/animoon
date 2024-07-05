import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
const DynamicNav = dynamic(() => import("@/app/Nav/Nav"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KaidoX - Watch free Anime Online English Sub/Dub",
  description: `KaidoX is the best site to watch
                      Anime SUB online, or you can even
                      watch Anime DUB in HD quality. You
                      can also find UnderRated anime
                      on KaidoX website.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicNav>{children}</DynamicNav>
      </body>
    </html>
  );
}
