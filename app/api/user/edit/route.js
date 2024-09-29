import User from "@/models/User"; // Ensure the correct path to your User model
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, username, email, phoneNumber, newPassword } = body;

        // Validate the request body
        if (!userId || !username || !email || !phoneNumber) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Update user details
        user.username = username;
        user.email = email.toLowerCase(); // Ensure email is stored in lowercase
        user.phoneNumber = phoneNumber;

        // If a new password is provided, hash it and update the user's password
        if (newPassword) {
            // Hash the new password
            user.password = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds
        }

        // Save the updated user to the database
        await user.save();

        // Return the updated user data along with a success message
        return NextResponse.json(
            {
                message: "Profile updated successfully!",  // Success message
                user: {  // Return the updated user data
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
