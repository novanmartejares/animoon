import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const DynamicNav = dynamic(() => import("@/app/Nav/Nav"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animoon - Watch free Anime Online English Sub/Dub",
  description: "Explores the world of Animes...",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}><DynamicNav>{children}</DynamicNav></body>
      </html>
  );
}
