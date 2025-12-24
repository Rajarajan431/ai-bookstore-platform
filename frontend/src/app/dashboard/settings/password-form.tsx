"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updatePassword } from "@/lib/user.api";

export default function PasswordForm() {
  const form = useForm();

  const onSubmit = async (data: any) => {
    await updatePassword(data);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Change your password to keep your account secure
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Current Password
            </label>
            <Input
              type="password"
              {...form.register("currentPassword")}
              placeholder="Enter your Current Password"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              New Password
            </label>
            <Input
              type="password"
              {...form.register("newPassword")}
              placeholder="Enter your New Password"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
