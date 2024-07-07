import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { clientId, clientSecret, redirectURL, tokenURL } from "@/variables";

import { AccessTokenData } from "@/tsInterfaces";

const useSpotifyToken = () => {
  const [token, setToken] = useState<AccessTokenData | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setTokenInLocalStorage = (token: AccessTokenData) => {
    const refreshToken = token.refresh_token || token.refresh_token;
    const localToken = {
      access_token: token.access_token,
      refresh_token: refreshToken,
      expiry: new Date(Date.now() + token.expires_in * 1000).toISOString(),
    };

    localStorage.setItem("token", JSON.stringify(localToken));
  };

  const fetchToken = async (params: URLSearchParams) => {
    try {
      const response = await axios.post(tokenURL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        },
      });
      const tokenData = response.data as AccessTokenData;
      setToken(tokenData);
      setTokenInLocalStorage(tokenData);
      return tokenData;
    } catch (error) {
      console.log("Error fetching token", error);
      return null;
    }
  };

  const refreshAccessToken = async (refreshToken: string) => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", clientId);

    return await fetchToken(params);
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const params = new URLSearchParams();
      params.append("code", code);
      params.append("redirect_uri", redirectURL);
      params.append("grant_type", "authorization_code");

      fetchToken(params).then(() => router.push("/playlist"));
    }
  }, [searchParams]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenData = JSON.parse(token);
      setToken(tokenData);
      const expiryDate = new Date(tokenData.expiry);

      if (new Date() > expiryDate) {
        refreshAccessToken(tokenData.refresh_token).then((newToken) => {
          if (newToken) {
            router.push("/playlist");
          }
        });
        console.log("Token Expired");
      } else {
        router.push("/playlist");
      }
    }
  }, []);

  return token;
};

export default useSpotifyToken;
