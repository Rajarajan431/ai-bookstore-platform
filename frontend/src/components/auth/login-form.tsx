"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginApi } from "@/lib/auth.api";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setError(null);
      const res = await loginApi(data);
      dispatch(loginSuccess(res));
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        
        <Input
          placeholder="Email"
          className="h-11 rounded-lg border border-gray-300 px-4 text-black focus:border-black focus:ring-black"
          {...form.register("email")}
        />

        <Input
          type="password"
          placeholder="Password"
          className="h-11 rounded-lg border border-gray-300 px-4 text-black focus:border-black focus:ring-black"
          {...form.register("password")}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <Button
          className="h-11 w-full rounded-lg bg-black text-white hover:bg-gray-900 disabled:opacity-50"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>

      </form>
    </div>

  );
}
