import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
import { dark } from "@clerk/themes";
import Navic from "@/app/Navic/page";

export const metadata = {
  title: "Animoon - Watch free Anime Online English Sub/Dub",
  description: `Animoon is the best site to watch
                      Anime SUB online, or you can even
                      watch Anime DUB in HD quality. You
                      can also find UnderRated anime
                      on Animoon website.`,
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Navic>
            {children}
          </Navic>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
