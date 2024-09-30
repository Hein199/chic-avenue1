import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json(
                { message: "Missing required field: userId" },
                { status: 400 }
            );
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

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
