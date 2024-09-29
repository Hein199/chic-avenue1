import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const products = await Product.find();

        return NextResponse.json(
            {
                message: "Products retrieved successfully!",
                products: products,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error retrieving products:", error);
        return NextResponse.json(
            { message: "Failed to retrieve products", error: error.message },
            { status: 500 }
        );
    }
}
