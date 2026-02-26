import Cookies from "js-cookie";

const API = process.env.NEXT_PUBLIC_API_URL;

export const apiRequest = async (
  url: string,
  options: RequestInit = {},
  auth: boolean = false,
) => {
  const headers: any = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (auth) {
    const token = Cookies.get("token");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return fetch(`${API}${url}`, {
    ...options,
    headers,
  });
};
