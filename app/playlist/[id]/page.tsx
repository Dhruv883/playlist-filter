"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AccessTokenData, Playlist, Track } from "@/tsInterfaces";
import { redirect } from "next/navigation";
import TrackCard from "@/components/TrackCard";

const Page = ({ params }: { params: { id: number } }) => {
  const [token, setToken] = useState<AccessTokenData>();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [tracks, setTracks] = useState<Array<Track>>();
  const playlistId = params.id;

  // FILTERS
  const [artists, setArtists] = useState<Set<string>>(new Set());
  const [albums, setAlbums] = useState<Set<string>>(new Set());

  const fetchTracks = async () => {
    try {
      const response = await axios.get(
        `/api/playlists/${playlistId}/tracks?total=${playlist!.total}`,
        {
          headers: {
            Authorization: `Bearer ${token!.access_token}`,
          },
        }
      );
      setTracks(response.data);
    } catch (error) {
      console.log("Error fetching tracks", error);
    }
  };

  useEffect(() => {
    let tokenLS = localStorage.getItem("token");
    if (!tokenLS) redirect("/login");
    let playlists = localStorage.getItem("playlists");
    if (!playlists) redirect("/playlist");

    const tokenData = JSON.parse(tokenLS!);
    const plist = JSON.parse(playlists).filter(
      (playlist: Playlist) => playlist.id == playlistId.toString()
    );
    setToken(tokenData);
    setPlaylist(plist[0]);
  }, []);

  useEffect(() => {
    if (token && playlist) fetchTracks();
  }, [token, playlist]);

  useEffect(() => {
    if (tracks) {
      tracks.forEach((track: Track) => {
        setArtists((prevArtists) => new Set(prevArtists).add(track.artists[0]));
        setAlbums((prevAlbums) => new Set(prevAlbums).add(track.album));
      });
    }
  }, [tracks]);

  return (
    <div className={`min-h-screen bg-primary text-white p-4 font-manRope`}>
      <div className="mx-12 mt-10">
        <div className="relative flex items-center space-x-6">
          <div className="w-2/5 flex justify-center">
            <Image
              src={playlist?.images[0]!}
              alt="Playlist Image"
              height={250}
              width={275}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-lightBlue">
              {playlist?.name}
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              {playlist?.description}
            </p>
            <p className="text-gray-400 mt-2 text-lg">
              {playlist?.total} track -{" "}
              {Math.round((playlist?.total! * 3.5) / 60)}+ hrs
            </p>
            {!playlist?.in_collection && (
              <div className="flex space-x-4 mt-4">
                <button className="px-4 py-2 bg-[#2D3032] rounded-full flex items-center gap-2 text-base">
                  <Image
                    src="/playlist-add.svg"
                    width={25}
                    height={25}
                    alt=""
                  />
                  Add to collection
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="border my-10">
          Filters
          <div></div>
        </div>

        <div className="mt-8">
          <div className="space-y-4">
            {tracks?.map((track, index) => (
              <TrackCard key={index} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
