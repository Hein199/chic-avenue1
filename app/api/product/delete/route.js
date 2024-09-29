import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const { productId, userId } = await request.json();

        // Validate the request body
        if (!productId || !userId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        // Check if the user is authorized to delete the product
        if (product.userId.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to delete this product" },
                { status: 403 }
            );
        }

        // Delete the product
        await Product.deleteOne({ _id: productId });

        // Return a success message
        return NextResponse.json(
            { message: "Product deleted successfully!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { message: "Failed to delete product", error: error.message },
            { status: 500 }
        );
    }
}
