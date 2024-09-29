import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, email, phoneNumber, password } = body;

        if (!username || !email || !phoneNumber || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json(
            {
                message: "User registered successfully!",
                user: {
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
