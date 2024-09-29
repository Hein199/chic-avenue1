import User from "@/models/User"; // Ensure the correct path to your User model
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { userId } = body;

        // Validate the request body
        if (!userId) {
            return NextResponse.json(
                { message: "Missing required field: userId" },
                { status: 400 }
            );
        }

        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Return a success message
        return NextResponse.json(
            { message: "User account deleted successfully!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting user account:", error);
        return NextResponse.json(
            { message: "Failed to delete user account", error: error.message },
            { status: 500 }
        );
    }
}
