"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/auth.slice";
import { registerApi } from "@/lib/auth.api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<RegisterFormData>();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerApi(data);

      localStorage.setItem("token", res.token);
      dispatch(loginSuccess(res));

      router.push("/");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    }
  };

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          placeholder="Name"
          className="h-11 rounded-lg border border-gray-300 px-4 text-black focus:border-black focus:ring-black"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}

        <Input
          placeholder="Email"
          type="email"
          className="h-11 rounded-lg border border-gray-300 px-4 text-black focus:border-black focus:ring-black"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        <Input
          placeholder="Password"
          type="password"
          className="h-11 rounded-lg border border-gray-300 px-4 text-black focus:border-black focus:ring-black"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-black text-white hover:bg-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Register"}
        </Button>
      </form>

  );
}
