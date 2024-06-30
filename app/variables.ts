const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET!;
const redirectURL = "http://localhost:3000/login";
const tokenURL = "https://accounts.spotify.com/api/token";
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${encodeURIComponent(
  clientId
)}&scope=${encodeURIComponent(
  scopes.join(" ")
)}&redirect_uri=${encodeURIComponent(redirectURL)}&show_dialog=true`;

export {
  clientId,
  clientSecret,
  redirectURL,
  tokenURL,
  scopes,
  spotifyAuthURI,
};
