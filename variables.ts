const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET!;
const redirectURL = "http://localhost:3000/login";
const tokenURL = "https://accounts.spotify.com/api/token";
const authURL = "https://accounts.spotify.com/authorize";
const baseURL = "https://api.spotify.com/v1";

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

const spotifyAuthURI = `${authURL}?response_type=code&client_id=${clientId}&scope=${scopes.join(
  " "
)}&redirect_uri=${redirectURL}&show_dialog=true`;

export {
  clientId,
  clientSecret,
  redirectURL,
  tokenURL,
  scopes,
  spotifyAuthURI,
  baseURL,
};
