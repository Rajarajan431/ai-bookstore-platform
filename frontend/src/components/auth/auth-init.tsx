"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loadFromStorage, logout } from "@/store/slices/auth.slice";
import { getMeApi } from "@/lib/auth.api";

export function AuthInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getMeApi()
      .then(() => {
        dispatch(loadFromStorage());
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  return null;
}
