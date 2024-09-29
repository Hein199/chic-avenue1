import Order from "@/models/Order"; // Ensure the correct path to your Order model
import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, products, shippingAddress } = await request.json();

        // Validate the request body
        if (!userId || !products || products.length === 0 || !shippingAddress) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        let totalAmount = 0;

        // Ensure all productIds are valid and calculate the total amount
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return NextResponse.json(
                    { message: `Product with ID ${item.productId} not found` },
                    { status: 404 }
                );
            }
            // Calculate the total amount by adding the product's price
            totalAmount += product.price;
        }

        // Create a new order
        const newOrder = new Order({
            userId,
            products,
            shippingAddress,
            totalAmount,
        });

        // Save the order to the database
        await newOrder.save();

        // Return the saved order data along with a success message
        return NextResponse.json(
            {
                message: "Order placed successfully!",  // Success message
                order: {  // Return the order data
                    _id: newOrder._id,
                    userId: newOrder.userId,
                    products: newOrder.products,
                    totalAmount: newOrder.totalAmount,
                    shippingAddress: newOrder.shippingAddress,
                    createdAt: newOrder.createdAt,
                    updatedAt: newOrder.updatedAt,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { message: "Failed to create order", error: error.message },
            { status: 500 }
        );
    }
}
