import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navic from "@/app/Navic/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animoon - Watch free Anime Online English Sub/Dub",
  description: `Animoon is the best site to watch
                      Anime SUB online, or you can even
                      watch Anime DUB in HD quality. You
                      can also find UnderRated anime
                      on Animoon website.`,
  verification: {
    google: "kYXVnTNfGMSS99gN9cOo6qdi8yymZEeXA1SvuHiAs4U",
  },

  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-Y81ZRXNW2N",
      async: true,
    },
    {
      type: "application/javascript",
      dangerouslySetInnerHTML: {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-Y81ZRXNW2N');
      `,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Navic>{children}</Navic>
        </body>
      </html>
    </ClerkProvider>
  );
}
