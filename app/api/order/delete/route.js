import Order from "@/models/Order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// DELETE handler for deleting an order
export async function DELETE(request) {
    try {
        // Extract orderId and userId from the request body
        const { orderId, userId } = await request.json();

        // Validate the request body
        if (!orderId || !userId) {
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

        // Check if the user is authorized to delete the order
        if (order.userId.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to delete this order" },
                { status: 403 }
            );
        }

        // Delete the order
        await Order.findByIdAndDelete(orderId);

        // Return success response
        return NextResponse.json(
            { message: "Order deleted successfully!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json(
            { message: "Failed to delete order", error: error.message },
            { status: 500 }
        );
    }
}
