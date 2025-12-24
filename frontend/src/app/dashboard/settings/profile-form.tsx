"use client";

import { useEffect } from "react";
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
import { getMe, updateProfile } from "@/lib/user.api";

export default function ProfileForm() {
  const form = useForm({
    defaultValues: { name: "", email: "" },
  });

 useEffect(() => {
    getMe().then((user) => {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
    });
  }, [form]);

  const onSubmit = async (data: any) => {
    await updateProfile(data);
    alert("User Profile Successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              {...form.register("name")}
              placeholder="Your name"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              {...form.register("email")}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
