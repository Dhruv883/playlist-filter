"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import { AccessTokenData, PLaylist } from "@/tsInterfaces";
import PlayListCard from "@/components/PlayListCard";
import ImportPlaylist from "@/components/ImportPlaylist";
import { setPlaylistsLocal, fetchPlaylistsLocal } from "@/utils/playlist";
import CustomLayout from "@/components/CustomLayout";

const page = () => {
  const [token, setToken] = useState<AccessTokenData>();
  const [playlists, setPlaylists] = useState<[]>([]);

  const fetchPlaylists = async () => {
    // Fetch from Local Storage
    const playlistLocal = fetchPlaylistsLocal();
    if (playlistLocal != null) {
      setPlaylists(playlistLocal);
      return;
    }
    // Fetch Playlist
    try {
      const response = await axios.get(`/api/playlists`, {
        headers: {
          Authorization: `Bearer ${token!.access_token}`,
        },
      });

      setPlaylistsLocal(response.data);
      setPlaylists(response.data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  useEffect(() => {
    let tokenLS = localStorage.getItem("token");
    if (!tokenLS) redirect("/login");

    const tokenData = JSON.parse(tokenLS!);
    setToken(tokenData);
  }, []);

  useEffect(() => {
    if (token) fetchPlaylists();
  }, [token]);

  useEffect(() => {
    if (playlists.length > 0) setPlaylistsLocal(playlists);
  }, [playlists]);

  // console.log(playlists);

  return (
    <CustomLayout>
      <div className="w-screen space-y-6 overflow-x-hidden bg-black p-4 text-white gap-10 font-manRope">
        <div className="text-center text-5xl font-semibold tracking-wide relative">
          Playlists
          {token && (
            <ImportPlaylist token={token} setPlaylists={setPlaylists} />
          )}
        </div>
        <div className="flex flex-wrap gap-10 justify-evenly">
          {playlists?.map((playlist: PLaylist, index: number) => {
            return <PlayListCard playlist={playlist} key={index} />;
          })}
        </div>
      </div>
    </CustomLayout>
  );
};

export default page;
