import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

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
