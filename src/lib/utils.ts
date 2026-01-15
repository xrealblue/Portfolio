  import { clsx, type ClassValue } from "clsx";
  import { ApiResponse } from "hmm-api";
  import { twMerge } from "tailwind-merge";
  import { third_api } from "./api";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  export interface uploadedImageT {
    data: { direct_url: string; deletion_url: string };
  }

  export const uploadImage = async (
    file: File,
  ): Promise<ApiResponse<uploadedImageT>> => {
    const formData = new FormData();
    formData.append(
      "payload_json",
      JSON.stringify({
        upload_source: process.env.NEXT_PUBLIC_UPLOAD_SOURCE,
        domain: process.env.NEXT_PUBLIC_UPLOAD_DOMAIN,
        type: 1,
        name: file.name,
      }),
    );
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload-image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: data.error || data.message || "Upload failed",
          response: res,
        } as ApiResponse<uploadedImageT>;
      }

      return {
        success: true,
        status: res.status,
        data: data,
        response: res,
      } as ApiResponse<uploadedImageT>;
    } catch (error: any) {
      return {
        success: false,
        status: 500,
        error: error.message || "Network error",
      } as ApiResponse<uploadedImageT>;
    }
  };
