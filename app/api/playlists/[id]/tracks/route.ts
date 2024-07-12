import { NextRequest } from "next/server";
import axios from "axios";
import { baseURL } from "@/variables";
import { headers } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const id = params.id;
  const totalTracks = request.nextUrl.searchParams.get("total");

  try {
    // Get Tracks in chunks
    const offset = Number(totalTracks) / 100;
    const tracksRaw: any = [];

    for (let i = 0; i <= offset; i++) {
      const tracksResponse = await axios.get(
        `${baseURL}/playlists/${id}/tracks?limit=100&offset=${i * 100}`,
        {
          headers: {
            Authorization: `${headersList.get("authorization")}`,
          },
        }
      );

      const trackPart = tracksResponse.data.items;
      trackPart?.forEach((track: any) => {
        tracksRaw.push(track);
      });
    }

    // Extract relevent information
    const tracksFinal = tracksRaw
      .filter((track: any) => track.track.name.trim() !== "")
      .map((track: any) => ({
        added_at: new Date(track.added_at).getTime(),
        image: track.track.album.images[0]?.url,
        id: track.track.id,
        name: track.track.name,
        album: track.track.album.name,
        popularity: track.track.popularity,
        preview_url: track.track.preview_url,
        artists: track.track.artists.map((artist: any) => artist.name),
        duration: track.track.duration_ms,
        spotifyURI: track.track.external_urls.spotify,
      }));

    return Response.json(tracksFinal);
  } catch (error) {
    return Response.json({ error: `Error Fetching Playlist: ${error}` });
  }
}
