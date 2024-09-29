import User from "@/models/User"; // Ensure the correct path to your User model
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        // Extract userId from the URL parameters
        const { id } = params;

        // Validate userId
        if (!id) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Find the user by their ID
        const user = await User.findById(id).select("-password"); // Exclude password field

        // If user not found
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Return user information
        return NextResponse.json(
            { user },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user information:", error);
        return NextResponse.json(
            { message: "Failed to fetch user information", error: error.message },
            { status: 500 }
        );
    }
}
