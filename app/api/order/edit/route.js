import Order from "@/models/Order"; // Ensure the correct path to your Order model
import Product from "@/models/Product"; // Ensure the correct path to your Product model
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { orderId, userId, products, shippingAddress } = await request.json();

        // Validate the request body
        if (!orderId || !userId || !products || products.length === 0 || !shippingAddress) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        // Ensure the user is authorized to edit the order
        if (order.userId.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to edit this order" },
                { status: 403 }
            );
        }

        // Recalculate the totalAmount based on the updated products
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

        // Update the order fields
        order.products = products;
        order.shippingAddress = shippingAddress;
        order.totalAmount = totalAmount;

        // Save the updated order
        await order.save();

        // Return the updated order data along with a success message
        return NextResponse.json(
            {
                message: "Order updated successfully!",  // Success message
                order: {  // Return the updated order data
                    _id: order._id,
                    userId: order.userId,
                    products: order.products,
                    totalAmount: order.totalAmount,
                    shippingAddress: order.shippingAddress,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
            { message: "Failed to update order", error: error.message },
            { status: 500 }
        );
    }
}
