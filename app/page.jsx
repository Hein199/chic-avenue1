import { Card } from "@/components/ui/card";
import React from "react";
import Link from "next/link";

const AllProducts = async () => {
  const response = await fetch("http://127.0.0.1:3000/api/product/products");
  const products = await response.json();
  console.log(products);
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-2xl text-center pb-10">
        Welcome to the Chic Avenue Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.products.map((product) => {
          return (
            <Card key={product._id}>
              <Link href={`/order/${product._id}`}>
                <div className="h-28 overflow-hidden">
                  <img
                    className="w-full"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="px-1 mb-2">
                  <h2 className="px-1 font-bold line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="px-1 text-sm line-clamp-1">${product.price}</p>
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
