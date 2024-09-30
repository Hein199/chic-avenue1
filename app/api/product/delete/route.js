import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const { productId, userId } = await request.json();

        if (!productId || !userId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        if (product.userId.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to delete this product" },
                { status: 403 }
            );
        }

        await Product.deleteOne({ _id: productId });

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
