import { ReactNode } from "react";

export interface AccessTokenData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  id: string;
  images: Array<string>;
  name: string;
  owner: string;
  isPublic: boolean;
  tracks: string;
  total: number;
  uri: string;
  in_collection: string;
}

export interface Track {
  image: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  added_at: Date;
  album: string;
  artists: Array<string>;
  duration: number;
  spotifyURI: string;
  // acousticness: number;
  // danceability: number;
  // energy: number;
  // liveliness: number;
  // loudness: number;
}

export interface PlayListCardProps {
  playlist: Playlist;
}

export interface ImportPlaylistPrps {
  token: AccessTokenData;
  setPlaylists: Function;
}

export interface CustomLayoutProps {
  children: ReactNode;
}

export interface TrackProps {
  track: Track;
}
