import { PLaylist } from "@/tsInterfaces";
import { NextApiRequest } from "next";
import axios from "axios";
import { baseURL } from "@/variables";
import { headers } from "next/headers";

export async function GET(request: NextApiRequest) {
  const headersList = headers();
  try {
    const response = await axios.get(`${baseURL}/me/playlists`, {
      headers: {
        Authorization: `${headersList.get("authorization")}`,
      },
    });

    const playlistData = response.data.items.map((item: any) => ({
      collaborative: item.collaborative,
      description: item.description,
      id: item.id,
      images: item.images?.map((image: any) => {
        return image.url;
      }),
      name: item.name,
      owner: item.owner.display_name,
      isPublic: item.public,
      tracks: item.tracks.href,
      total: item.tracks.total,
      uri: item.uri,
    }));
    return Response.json(playlistData);
  } catch (error) {
    return Response.json({ error: `Error Fetching Playlists: ${error}` });
  }
}
