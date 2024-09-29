import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, username, email, phoneNumber, newPassword } = body;

        if (!userId || !username || !email || !phoneNumber) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        user.username = username;
        user.email = email.toLowerCase();
        user.phoneNumber = phoneNumber;

        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        return NextResponse.json(
            {
                message: "Profile updated successfully!",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
            { message: "Failed to update profile", error: error.message },
            { status: 500 }
        );
    }
}
