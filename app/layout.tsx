import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotiFilter",
  description:
    "App to Import multiple playlists and filter songs and add filtered songs to existing playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <div className="h-screen font-manRope dark">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
