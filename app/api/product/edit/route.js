import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { productId, name, price, description, image, userId } = await request.json();

        if (!productId || !name || !price || !description || !image || !userId) {
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
                { message: "Unauthorized to edit this product" },
                { status: 403 }
            );
        }

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;

        await product.save();

        return NextResponse.json(
            {
                message: "Product updated successfully!",
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { message: "Failed to update product", error: error.message },
            { status: 500 }
        );
    }
}
