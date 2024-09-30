import { Link } from "next/link";
import { cookies } from "next/headers";
import React from "react";
import TextareaForm from "./components/form";

const OrderPage = async ({ params }) => {
  const response = await fetch(
    `https://chic-avenue1.vercel.app/api/product/product/${params.id}/`
  );
  console.debug(response);
  const { product } = await response.json();
  const cookieStore = cookies();
  const id = cookieStore.get("id")?.value ?? undefined;
  return (
    <div className="max-w-xl mx-auto py-10 px-6 w-full">
      <img src={product.image} alt={product.name} />
      <p className="mt-4">
        {product.name} - ${product.price}
      </p>
      <p className="mt-1">{product.description}</p>
      <div className="mt-4">
        {id !== undefined ? (
          <TextareaForm productId={product._id} userId={id} />
        ) : (
          <a href="/auth/login">Login to order</a>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
