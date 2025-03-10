import { API_BASE_URL } from "./api";

export const getUserProfile = async (user_id: string, token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${user_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};
