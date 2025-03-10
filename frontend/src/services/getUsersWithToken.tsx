import { API_BASE_URL } from "./api";

export const getUsersWithToken = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
