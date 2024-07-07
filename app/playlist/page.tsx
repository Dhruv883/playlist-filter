"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import { AccessTokenData, PLaylist } from "@/tsInterfaces";
import PlayListCard from "@/components/PlayListCard";

const page = () => {
  const [token, setToken] = useState<AccessTokenData>();
  const [playlists, setPlaylists] = useState<[]>([]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`/api/playlists`, {
        headers: {
          Authorization: `Bearer ${token!.access_token}`,
        },
      });

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

  console.log(playlists);

  return (
    <div className="h-5/6 w-screen space-y-6 overflow-x-hidden bg-black p-4 text-white gap-10 font-notoSans">
      <div className="text-center text-4xl">YOUR PLAYLISTS</div>
      <div className="flex flex-wrap gap-4 justify-evenly">
        {playlists?.map((playlist: PLaylist) => {
          return <PlayListCard playlist={playlist} />;
        })}
      </div>
    </div>
  );
};

export default page;
