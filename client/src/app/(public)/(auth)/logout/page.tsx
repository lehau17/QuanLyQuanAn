"use client";
import { getRefreshTokenFromLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function LogoutPage() {
  const ref = useRef(null);
  const { mutateAsync } = useLogoutMutation();
  const searchParam = useSearchParams();
  const refreshToken = searchParam.get("refreshToken");
  const router = useRouter();
  useEffect(() => {
    if (ref.current || refreshToken != getRefreshTokenFromLocalStorage())
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
