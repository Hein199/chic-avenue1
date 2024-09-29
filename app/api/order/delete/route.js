import Order from "@/models/Order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(request) {
    try {
        const { orderId, userId } = await request.json();

        if (!orderId || !userId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        if (order.userId.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to delete this order" },
                { status: 403 }
            );
        }

        await Order.findByIdAndDelete(orderId);

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
