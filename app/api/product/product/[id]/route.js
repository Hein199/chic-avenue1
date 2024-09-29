import Product from "@/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid product ID" },
                { status: 400 }
            );
        }

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Product retrieved successfully!",
                product: product,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error retrieving product details:", error);
        return NextResponse.json(
            { message: "Failed to retrieve product details", error: error.message },
            { status: 500 }
        );
    }
}
