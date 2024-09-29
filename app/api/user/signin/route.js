import User from "@/models/User"; // Ensure the correct path to your User model
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcrypt for comparing passwords

// POST handler for user sign-in
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate the request body
        if (!email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        // Return the user data along with a success message
        return NextResponse.json(
            {
                message: "User signed in successfully!",  // Success message
                user: {  // Return the user data
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
