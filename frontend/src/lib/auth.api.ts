import { apiFetch } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export async function loginApi(payload: LoginPayload) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerApi(data: {
  name: string;
  email: string;
  password: string;
}) {
  return apiFetch<{
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function getMeApi() {
  return apiFetch<{
    id: number;
    name: string;
    email: string;
    role: string;
  }>("/auth/me");
}
