import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
const DynamicNav = dynamic(() => import("@/app/Nav/Nav"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animoon - Watch free Anime Online English Sub/Dub",
  description: "Explores the world of Animes...",
  verification: {
    google: "x0aiWAODNGU-1UA2FXyORfyme9uWJir7mIMu8AMmLm4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          src="//pl23672011.highrevenuenetwork.com/35/7f/ae/357fae365ddc1b070a9615b318f066fa.js"
        />
      </head>
      <body className={inter.className}>
        <DynamicNav>{children}</DynamicNav>
      </body>
    </html>
  );
}
