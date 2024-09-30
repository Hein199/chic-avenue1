import React from "react";
import getId from "../functions/id";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const AllProducts = async () => {
  // const id = getId();
  const response = await fetch(
    "https://chic-avenue1.vercel.app//api/product/user?userId=" + getId()
  );
  const { products } = await response.json();
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="my-6 ml-auto">
        <Link href="/products/create">Add Product</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice._id}</TableCell>
              <TableCell className="">
                {invoice?.name?.substring(0, 50)}
              </TableCell>
              <TableCell className="text-right">${invoice.price}</TableCell>
              <TableCell className="text-right">
                <Link href={`/products/${invoice._id}`}>View</Link>
                {/* <DeleteButton orderId={invoice._id} userId={id} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllProducts;

export const fetchCache = 'force-no-store';