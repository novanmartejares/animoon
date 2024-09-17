import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { dark } from "@clerk/themes";
import Navic from "@/app/Navic/page";
import Head from "next/head"; // Import the Head component

const inter = Inter({ subsets: ["latin"] });

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
        <Head>
          {/* Google Tag Manager */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y81ZRXNW2N"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Y81ZRXNW2N');
              `,
            }}
          />
        </Head>
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
