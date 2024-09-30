"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

const UserRegister = (data) => {
  const form = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        alert("User registered successfully");
        router.push("/auth/login");
      } else {
        alert("User already exists");
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
      <h1>Register</h1>
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
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...form.register("password")}
          required
        />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default UserRegister;
