import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const users = await User.find();

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
