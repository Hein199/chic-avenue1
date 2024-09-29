import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const products = await Product.find({ userId });

        if (products.length === 0) {
            return NextResponse.json(
                { message: "No products found for this user" },
                { status: 404 }
            );
        }

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
