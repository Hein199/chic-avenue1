import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Return the products in the response
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
