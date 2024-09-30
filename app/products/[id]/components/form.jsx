"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const ProductForm = ({ data, userId }) => {
  const prodcutId = data._id;
  const form = useForm({
    defaultValues: {
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
    },
  });
  const router = useRouter();

  const deleteProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/product/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, productId: prodcutId }),
    });
    if (response.ok) {
      alert("Product deleted");
      window.location.href = "/products";
    } else {
      alert("Failed to delete product");
    }
  };

  const onSubmit = async (data) => {
    const response = await fetch(`http://localhost:3000/api/product/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: userId, productId: prodcutId }),
    });
    if (response.ok) {
      alert("Product edited");
      window.location.reload();
    } else {
      alert("Failed to edit product");
    }
  };

  return (
    <div>
      <form
        className="max-w-sm mx-auto py-10 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1>Edit</h1>
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

        <Button type="submit">Update</Button>
        <Button
          variant="destructive"
          className="ml-2"
          role="button"
          type="button"
          onClick={deleteProduct}
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
