"use client";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function LogoutPage() {
  const ref = useRef(null);
  const { mutateAsync } = useLogoutMutation();
  const searchParam = useSearchParams();
  const refreshToken = searchParam.get("refreshToken");
  const accessToken = searchParam.get("accessToken");
  const router = useRouter();
  useEffect(() => {
    if (
      ref.current ||
      (refreshToken && refreshToken != getRefreshTokenFromLocalStorage()) ||
      (accessToken && accessToken != getAccessTokenFromLocalStorage())
    )
      return;
    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null;
      }, 1000);
    });
    router.push("/login");
  }, []);

  return <div>LogoutPage</div>;
}
