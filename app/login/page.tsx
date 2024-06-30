"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import {
  clientId,
  clientSecret,
  redirectURL,
  tokenURL,
  scopes,
  spotifyAuthURI,
} from "../variables";

interface AccessTokenData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
}

const page = () => {
  if (!clientId || !clientSecret) return null;

  const searchParams = useSearchParams();

  const setTokenInLocalStorage = (token: AccessTokenData) => {
    const localToken = {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expiry: new Date(Date.now() + 60 * 60 * 1000),
    };

    localStorage.setItem("token", JSON.stringify(localToken));
  };

  const refreshToken = async (refresh_token: string) => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refresh_token);
    params.append("client_id", clientId);

    try {
      const response = await axios.post(tokenURL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        },
      });

      console.log(response.data);

      setTokenInLocalStorage(response.data);
    } catch (error) {
      console.log("Error refreshing token", error);
    }
  };

  const fetchToken = async (code: string) => {
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("redirect_uri", redirectURL);
    params.append("grant_type", "authorization_code");
    try {
      const response = await axios.post(tokenURL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        },
      });

      setTokenInLocalStorage(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      fetchToken(code);
    }
  }, [searchParams]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenData = JSON.parse(token);
      const expiryDate = new Date(tokenData.expiry);

      if (new Date() < expiryDate) {
        refreshToken(tokenData.refresh_token);
      }
    }
  }, []);

  return (
    <div>
      <Link href={spotifyAuthURI} className="text-white">
        Sign In with Spotify
      </Link>
    </div>
  );
};

export default page;
