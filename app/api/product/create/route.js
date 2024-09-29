import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, price, description, image, userId } = body;

        // Validate the request body
        if (!name || !price || !description || !image || !userId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create a new product
        const newProduct = new Product({
            name,
            price,
            description,
            image,
            userId, // Use the user's ID from the request body
        });

        // Save the product to the database
        await newProduct.save();

        // Return the saved product data along with a success message
        return NextResponse.json(
            {
                message: "Product created successfully!",  // Success message
                product: {  // Return the product data
                    _id: newProduct._id,
                    name: newProduct.name,
                    price: newProduct.price,
                    description: newProduct.description,
                    image: newProduct.image,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { message: "Failed to create product", error: error.message },
            { status: 500 }
        );
    }
}
