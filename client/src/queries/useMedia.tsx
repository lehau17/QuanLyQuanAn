import { mediaApiRequest } from "@/apiRequests/media";
import { useMutation } from "@tanstack/react-query";

export const useUploadMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequest.upload,
  });
};
