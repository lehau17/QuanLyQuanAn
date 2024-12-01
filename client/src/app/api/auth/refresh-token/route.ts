import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json(
      { message: "Refresh token not found" },
      { status: 401 }
    );
  }
  try {
    const { payload } = await authApiRequest.sRefreshToken({ refreshToken });
    const { data } = payload;
    const decodeAccessToken = jwt.decode(data.accessToken) as { exp: number };
    const decodeRefreshToken = jwt.decode(data.refreshToken) as {
      exp: number;
    };
    cookieStore.set("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeRefreshToken.exp * 1000,
    });
    return Response.json(payload);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Loi xay ra khi refresh-token" },
      {
        status: 401,
      }
    );
  }
}
