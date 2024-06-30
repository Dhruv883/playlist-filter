import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
