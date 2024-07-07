"use client";
import Link from "next/link";
import { spotifyAuthURI } from "@/variables";
import useSpotifyToken from "@/hooks/useSpotifyToken";

const Page = () => {
  useSpotifyToken();
  return (
    <div className="h-5/6 w-screen overflow-x-hidden text-white bg-black p-4 flex flex-col gap-10 items-center justify-center">
      <Link
        href={spotifyAuthURI}
        className="text-black bg-white px-8 py-3 rounded-md text-xl"
      >
        Sign In with Spotify
      </Link>
    </div>
  );
};

export default Page;
