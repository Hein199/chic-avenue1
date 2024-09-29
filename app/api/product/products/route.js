import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await Product.find();

        const response = NextResponse.json(
            {
                message: "Products retrieved successfully!",
                products: products,
            },
            { status: 200 }
        );
        response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specify allowed methods
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Specify allowed headers

        return response;

    } catch (error) {
        console.error("Error retrieving products:", error);
        return NextResponse.json(
            { message: "Failed to retrieve products", error: error.message },
            { status: 500 }
        );
    }
}
