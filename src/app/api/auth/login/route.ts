import { db } from "@/lib/db";
import { Login, loginSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import OTPservice from "@/services/otp";

// List of allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
    'bhuvanbn01@gmail.com',
    'divyeshmali8055@gmail.com'
];

export const POST = async (req: NextRequest) => {
    const { email } = await req.json() as Login;
    
    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const result = loginSchema.safeParse({ email });
    if (!result.success) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Check if email is in allowed list
    if (!ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase())) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // Check if admin exists, if not create
    const admin = await db.admin.upsert({
        where: { email: result.data.email },
        update: {},
        create: {
            name: result.data.email.split('@')[0],
            email: result.data.email,
        },
    });

    try {
        // Send OTP to the provided email
        await OTPservice.sendOtp(result.data.email);
        return NextResponse.json({ 
            message: "OTP sent to your email",
            email: result.data.email // For development purposes only
        }, { status: 200 });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json(
            { error: "Failed to send OTP. Please try again." },
            { status: 500 }
        );
    }
};
