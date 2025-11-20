import { db } from "@/lib/db";
import { CreateUsp, createUspSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const { bulletPoints, heading, subheading } = await req.json() as CreateUsp
        let validatedData;
        try {
            validatedData = createUspSchema.parse({ bulletPoints, heading, subheading });
        } catch (error) {
            return NextResponse.json(
                {
                    error: (error as z.ZodError).issues
                        .map((issue) => issue.message)
                        .join(", "),
                },
                { status: 400 },
            );
        }
        const usp = await db.usp.create({
            data: validatedData
        });
        return NextResponse.json(
            {
                data: {
                    usp,
                },
                message: "Usp created successfully",
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('POST /api/usps error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};

export const GET = async () => {
    try {
        const usps = await db.usp.findMany();
        return NextResponse.json({
            data: {
                usps,
            },
            message: "Usps fetched successfully",
        });
    } catch (error) {
        console.error('GET /api/usps error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const { bulletPoints, heading, subheading } = await req.json() as CreateUsp;
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        let validatedData;
        try {
            validatedData = createUspSchema.parse({ bulletPoints, heading, subheading });
        } catch (error) {
            return NextResponse.json(
                {
                    error: (error as z.ZodError).issues
                        .map((issue) => issue.message)
                        .join(", "),
                },
                { status: 400 },
            );
        }

        const usp = await db.usp.update({
            where: { id },
            data: validatedData
        });

        return NextResponse.json(
            {
                data: {
                    usp,
                },
                message: "Usp updated successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('PUT /api/usps error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        const usp = await db.usp.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                data: {
                    usp,
                },
                message: "Usp deleted successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('DELETE /api/usps error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};
