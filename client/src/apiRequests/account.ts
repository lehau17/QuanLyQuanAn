import http from "@/lib/http";
import {
  AccountResType,
  ChangePasswordBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: async () => http.get<AccountResType>("accounts/me"),
  updateMe: async (data: UpdateMeBodyType) =>
    http.put<AccountResType>("accounts/me", data),
  changePassword: async (data: ChangePasswordBodyType) =>
    http.put<AccountResType>("accounts/change-password", data),
};

export default accountApiRequest;
