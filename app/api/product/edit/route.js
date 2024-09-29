import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { productId, name, price, description, image, userId } = await request.json();

        // Validate the request body
        if (!productId || !name || !price || !description || !image || !userId) {
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

        // Check if the user is authorized to edit the product
        if (product.userId.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to edit this product" },
                { status: 403 }
            );
        }

        // Update the product fields
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;

        // Save the updated product
        await product.save();

        // Return the updated product data along with a success message
        return NextResponse.json(
            {
                message: "Product updated successfully!",  // Success message
                product: {  // Return the updated product data
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
