import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, products, shippingAddress } = await request.json();

        if (!userId || !products || products.length === 0 || !shippingAddress) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        let totalAmount = 0;

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return NextResponse.json(
                    { message: `Product with ID ${item.productId} not found` },
                    { status: 404 }
                );
            }
            totalAmount += product.price;
        }

        const newOrder = new Order({
            userId,
            products,
            shippingAddress,
            totalAmount,
        });

        await newOrder.save();

        return NextResponse.json(
            {
                message: "Order placed successfully!",
                order: {
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
