import { API_BASE_URL } from "./api";

export const setNewUserProfile = async (
  token: string,
  user_id: string,
  newName: string,
  newPassword: string
) => {
  const response = await fetch(`${API_BASE_URL}/users/${user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: newName,
      password: newPassword,
    }),
  });

  if (!response.ok) throw new Error("Failed to update profile");

  return response.json();
};
