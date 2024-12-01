import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("api/auth/login", body, {
      baseUrl: "",
    }),
  sLogout: (body: LogoutBodyType & { accessToken: string }) => {
    const { accessToken, refreshToken } = body;
    return http.post(
      "/auth/logout",
      { refreshToken },
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
  },
  logout: () => http.post("api/auth/logout", null, { baseUrl: "" }),
};

export default authApiRequest;
