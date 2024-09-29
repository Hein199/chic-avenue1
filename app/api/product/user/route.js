import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

// GET handler to show the products created by the current user
export async function GET(request) {
    try {
        // Extract userId from the request (you can also extract it from a token or session if applicable)
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        // Validate the userId
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Find the products created by the user
        const products = await Product.find({ userId });

        // If no products found
        if (products.length === 0) {
            return NextResponse.json(
                { message: "No products found for this user" },
                { status: 404 }
            );
        }

        // Return the products
        return NextResponse.json(
            { products },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user's products:", error);
        return NextResponse.json(
            { message: "Failed to fetch products", error: error.message },
            { status: 500 }
        );
    }
}
