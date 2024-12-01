import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  console.log("access", accessToken, "refresh", refreshToken);
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "Lỗi xảy ra khi đăng xuất",
      },
      { status: 200 }
    );
  }
  try {
    const result = await authApiRequest.sLogout({ accessToken, refreshToken });
    return Response.json(result.payload);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Loi xay ra khi đăng xuất" },
      {
        status: 200,
      }
    );
  }
}
