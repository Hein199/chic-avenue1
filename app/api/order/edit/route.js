import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { orderId, userId, products, shippingAddress } = await request.json();

        if (!orderId || !userId || !products || products.length === 0 || !shippingAddress) {
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
                { message: "Unauthorized to edit this order" },
                { status: 403 }
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

        order.products = products;
        order.shippingAddress = shippingAddress;
        order.totalAmount = totalAmount;

        await order.save();

        return NextResponse.json(
            {
                message: "Order updated successfully!",
                order: {
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
