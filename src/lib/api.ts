import { toast } from "@/hooks/useToast";
import ApiClient from "hmm-api";

const api = new ApiClient({
  toast: toast,
  showGlobalErrorToast: false,
  returnParsedError: true,
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});
export const third_api = new ApiClient({
  toast: toast,
  showGlobalErrorToast: false,
  returnParsedError: true,
});

export default api;
