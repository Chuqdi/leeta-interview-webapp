import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// typed error so callers know what to expect
export interface ApiError {
  message: string;
  status: number | null;
  data: unknown;
}

const BASE_URL = "http://localhost:3000/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} →`, response.status);
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: "An unexpected error occurred",
      status: null,
      data: null,
    };

    if (error.response) {
      // server responded with a non-2xx status
      apiError.status = error.response.status;
      apiError.data = error.response.data;

      const messages: Record<number, string> = {
        400: "Bad request. Please check your input.",
        401: "Unauthorised. Please log in again.",
        403: "Forbidden. You don't have access to this resource.",
        404: "Resource not found.",
        409: "Conflict. This record may already exist.",
        422: "Validation error. Please check your input.",
        500: "Server error. Please try again later.",
      };

      apiError.message = messages[error.response.status] ?? `Unexpected error (${error.response.status})`;

    } else if (error.request) {
      // request was made but no response received
      apiError.message = error.code === "ECONNABORTED"
        ? "Request timed out. Please check your connection."
        : "Network error. Please check your internet connection.";
    }

    console.error(`[API] Error ${apiError.status ?? "Network"}:`, apiError.message, apiError.data ?? "");

    return Promise.reject(apiError);
  }
);

export default api;