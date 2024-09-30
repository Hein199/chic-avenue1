import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: "User signed in successfully!",
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
        console.error("Error signing in user:", error);
        return NextResponse.json(
            { message: "Failed to sign in user", error: error.message },
            { status: 500 }
        );
    }
}
