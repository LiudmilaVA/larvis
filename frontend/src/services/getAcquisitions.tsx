import { API_BASE_URL } from "./api";

export const getAcquisitions = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/acquisitions`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch acquisitions");

  return response.json();
};
