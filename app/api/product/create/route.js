import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, price, description, image, userId } = body;

        if (!name || !price || !description || !image || !userId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const newProduct = new Product({
            name,
            price,
            description,
            image,
            userId,
        });

        await newProduct.save();

        return NextResponse.json(
            {
                message: "Product created successfully!",
                product: {
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
