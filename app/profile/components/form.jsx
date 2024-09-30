"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const UserProfileForm = ({ userData, id }) => {
  const form = useForm({
    defaultValues: {
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    },
  });

  const router = useRouter();

  const deleteProfile = async () => {
    const response = await fetch(`https://chic-avenue1.vercel.app/api/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    });
    if (response.ok) {
      deleteCookie("id");
      alert("Profile deleted");
      window.location.href = "/";
    } else {
      alert("Failed to delete profile");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId: id,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        window.location.href = "/profile";
      } else {
        alert("An unexpected error happened occurred");
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      alert("An unexpected error happened occurred");
    }
  };

  return (
    <form
      className="max-w-sm mx-auto py-10 space-y-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h1>Profile</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          {...form.register("username")}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...form.register("email")}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          type="tel"
          id="phoneNumber"
          placeholder="Phone Number"
          {...form.register("phoneNumber")}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          placeholder="Phone Number"
          {...form.register("newPassword")}
          required
        />
      </div>

      <Button type="submit">Update</Button>
      <Button
        type="button"
        role="button"
        variant="destructive"
        className="ml-2"
        onClick={deleteProfile}
      >
        Delete
      </Button>
    </form>
  );
};

export default UserProfileForm;
