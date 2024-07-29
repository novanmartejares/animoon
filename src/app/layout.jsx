import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
const DynamicNavic = dynamic(() => import("@/app/Navic/page"), {});
const inter = Inter({ subsets: ["latin"] });
import { dark } from '@clerk/themes';

export const metadata = {
  title: "KaidoX ( Kaido ) - Watch free Anime Online English Sub/Dub",
  description: `KaidoX ( Kaido ) is the best site to watch
                      Anime SUB online, or you can even
                      watch Anime DUB in HD quality. You
                      can also find UnderRated anime
                      on KaidoX ( Kaido ) website.`,
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark
    }}>
      <html lang="en">
        <body className={inter.className}>
          <DynamicNavic>{children}</DynamicNavic>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
