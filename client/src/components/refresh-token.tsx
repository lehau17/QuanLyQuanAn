"use client";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";
type Props = {};
const UNAUTH = ["/login", "/logout", "/refresh-token"];
export default function RefreshToken({}: Props) {
  const pathName = usePathname();
  useEffect(() => {
    if (UNAUTH.includes(pathName)) return;
    let interval: any = null;
    const checkAccessTokenAndRefreshToken = async () => {
      const accessToken = getAccessTokenFromLocalStorage();
      const refreshToken = getRefreshTokenFromLocalStorage();
      if (!refreshToken || !accessToken) return;
      const decodeAccessToken = jwt.decode(accessToken) as {
        exp: number;
        iat: number;
      };
      const decodeRefreshToken = jwt.decode(refreshToken) as {
        exp: number;
        iat: number;
      };
      const now = Math.round(new Date().getTime()) / 1000;
      if (now >= decodeRefreshToken.exp) return;
      if (
        decodeAccessToken.exp - now <=
        (decodeAccessToken.exp - decodeAccessToken.iat) / 3
      ) {
        try {
          const {
            payload: {
              data: { accessToken, refreshToken },
            },
          } = await authApiRequest.refreshToken();
          setAccessTokenToLocalStorage(accessToken);
          setRefreshTokenToLocalStorage(refreshToken);
        } catch (error) {
          clearInterval(interval);
        }
      }
    };
    checkAccessTokenAndRefreshToken();
    interval = setInterval(checkAccessTokenAndRefreshToken, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [pathName]);
  return <div>RefreshToken</div>;
}
