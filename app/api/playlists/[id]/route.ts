import { NextApiRequest } from "next";
import axios from "axios";
import { baseURL } from "@/variables";
import { headers } from "next/headers";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const id = params.id;

  try {
    const response = await axios.get(`${baseURL}/playlists/${id}`, {
      headers: {
        Authorization: `${headersList.get("authorization")}`,
      },
    });

    const playlist = response.data;

    const playlistData = {
      collaborative: playlist.collaborative,
      description: playlist.description,
      id: playlist.id,
      images: playlist.images?.map((image: any) => {
        return image.url;
      }),
      name: playlist.name,
      owner: playlist.owner.display_name,
      isPublic: playlist.public,
      tracks: playlist.tracks.href,
      total: playlist.tracks.total,
      uri: playlist.uri,
    };
    return Response.json(playlistData);
  } catch (error) {
    return Response.json({ error: `Error Fetching Playlist: ${error}` });
  }
}
