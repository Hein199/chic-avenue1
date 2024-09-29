import User from "@/models/User"; // Ensure the correct path to your User model
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords

// POST handler for user registration
export async function POST(request) {
    try {
        const body = await request.json();
        const { username, email, phoneNumber, password } = body;

        // Validate the request body
        if (!username || !email || !phoneNumber || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 409 }
            );
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user
        const newUser = new User({
            username,
            email,
            phoneNumber,
            password: hashedPassword, // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Return the saved user data along with a success message
        return NextResponse.json(
            {
                message: "User registered successfully!",  // Success message
                user: {  // Return the user data
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "Failed to register user", error: error.message },
            { status: 500 }
        );
    }
}
