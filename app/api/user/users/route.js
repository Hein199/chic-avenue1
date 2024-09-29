import User from "@/models/User"; // Ensure the correct path to your User model
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Return the users in the response
        return NextResponse.json(
            {
                message: "Users retrieved successfully!",
                users: users,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error retrieving users:", error);
        return NextResponse.json(
            { message: "Failed to retrieve users", error: error.message },
            { status: 500 }
        );
    }
}
