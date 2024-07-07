export interface AccessTokenData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
}

export interface PLaylist {
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
}

export interface PlayListCardProps {
  playlist: PLaylist;
}

export interface ImportPlaylistPrps {
  token: AccessTokenData;
  setPlaylists: Function;
}
