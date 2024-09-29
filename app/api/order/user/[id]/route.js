import Order from "@/models/Order"; // Make sure the path to the Order model is correct
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET method to fetch orders made by the current user
export async function GET(request, { params }) {
    try {
        const { id } = params;

        // Check if the provided user ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid user ID" },
                { status: 400 }
            );
        }

        // Find all orders made by the user
        const orders = await Order.find({ userId: id }).populate("products.productId");

        // If no orders are found
        if (!orders || orders.length === 0) {
            return NextResponse.json(
                { message: "No orders found for this user" },
                { status: 404 }
            );
        }

        // Return the list of orders
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
