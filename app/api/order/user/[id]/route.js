import Order from "@/models/Order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid user ID" },
                { status: 400 }
            );
        }

        const orders = await Order.find({ userId: id }).populate("products.productId");

        if (!orders || orders.length === 0) {
            return NextResponse.json(
                { message: "No orders found for this user" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Orders retrieved successfully", orders },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { message: "Failed to retrieve orders", error: error.message },
            { status: 500 }
        );
    }
}
