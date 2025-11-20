import { db } from "@/lib/db";
import { CreateContact, createContactSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { courseId, email, firstName, lastName, orgName, phone } = await req.json() as CreateContact
    let validatedData;
    try {
        validatedData = createContactSchema.parse({ courseId, email, firstName, lastName, orgName, phone });
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
    const contact = await db.contact.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                contact,
            },
            message: "contact created successfully",
        },
        { status: 201 },
    );
};

export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    const [contacts, total] = await Promise.all([
        db.contact.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        }),
        db.contact.count(),
    ]);
    return NextResponse.json({
        data: {
            contacts,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "contacts fetched successfully",
    });
};