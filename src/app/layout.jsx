import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
const DynamicNav = dynamic(() => import("@/app/Nav/Nav"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animoon - Watch free Anime Online English Sub/Dub",
  description: `Animoom is the best site to watch
                      Anime SUB online, or you can even
                      watch Anime DUB in HD quality. You
                      can also find UnderRated anime
                      on Animoon website.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicNav>{children}</DynamicNav>
        <Analytics />
      </body>
    </html>
  );
}
