"use client";
import Link from "next/link";
import { spotifyAuthURI } from "@/variables";
import useSpotifyToken from "@/hooks/useSpotifyToken";
import CustomLayout from "@/components/CustomLayout";

const Page = () => {
  useSpotifyToken();
  return (
    <CustomLayout>
      <div className="h-full w-screen overflow-x-hidden text-white bg-black p-4 flex flex-col gap-10 items-center justify-center">
        <Link
          href={spotifyAuthURI}
          className="text-black bg-white px-8 py-3 rounded-md text-xl"
        >
          Sign In with Spotify
        </Link>
      </div>
    </CustomLayout>
  );
};

export default Page;
