import { AccessTokenData, PLaylist } from "@/tsInterfaces";
import axios from "axios";

const setPlaylistsLocal = (data: Array<PLaylist>) => {
  localStorage.setItem("playlists", JSON.stringify(data));
};

const fetchPlaylistsLocal = () => {
  const playlistsLocal = localStorage.getItem("playlists");
  if (!playlistsLocal) return null;
  const playlistsLocalData = JSON.parse(playlistsLocal);
  return playlistsLocalData;
};

const importPlaylist = async (link: string, token: AccessTokenData) => {
  const playlistID = link.split("/")[4].split("?")[0];

  try {
    const response = await axios.get(`/api/playlists/${playlistID}`, {
      headers: {
        Authorization: `Bearer ${token!.access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching playlists", error);
  }
};

export { setPlaylistsLocal, fetchPlaylistsLocal, importPlaylist };
