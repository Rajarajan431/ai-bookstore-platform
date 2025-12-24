import { apiFetch } from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

/**
 * Get currently logged-in user
 */
export const getMe = async (): Promise<User> => {
  return apiFetch<User>("/users/me");
};

/**
 * Update profile (name, email)
 */
export const updateProfile = async (data: {
  name?: string;
  email?: string;
}): Promise<User> => {
  return apiFetch<User>("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * Change password
 */
export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  return apiFetch<{ message: string }>("/users/me/password", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
