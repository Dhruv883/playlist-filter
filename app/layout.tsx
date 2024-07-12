import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotiFilter",
  description:
    "App to Import multiple playlists and filter songs and add filtered songs to existing playlists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="h-screen scrollbar-hide">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
