"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const CreateProductPage = (data) => {
  const form = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const userId = getCookie("id");
    try {
      const response = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });
      if (response.ok) {
        const product = await response.json();
        console.log(product);
        alert("Product created successfully");
        window.location.href = "/products";
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
      {/* name || !price || !description || !image || !userId */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          {...form.register("name")}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          placeholder="Price"
          {...form.register("price")}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          placeholder="Description"
          {...form.register("description")}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="image">Image Url</Label>
        <Input
          type="text"
          id="image"
          placeholder="Image"
          {...form.register("image")}
          required
        />
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateProductPage;
