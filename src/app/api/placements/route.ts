import { db } from "@/lib/db";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { CreatePlacement, createPlacementSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    
    // Parse the FormData, handling file field
    const body: any = {
        image: formData.get("image"),
        companyId: formData.get("companyId"),
        name: formData.get("name"),
        role: formData.get("role"),
    };
    
    let validatedData;
    try {
        validatedData = createPlacementSchema.parse(body);
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
    const company = await db.company.findUnique({
        where: { id: validatedData.companyId },
    });
    if (!company) {
        return NextResponse.json(
            { error: "Company not found" },
            { status: 404 }
        );
    }
    const photo = await uploadAndSaveImage(validatedData.image, "PLACEMENT");
    const placement = await db.placement.create({
        data: {
            name: validatedData.name,
            role: validatedData.role,
            companyId: validatedData.companyId,
            imageId: photo?.id,
        }
    });
    return NextResponse.json(
        {
            data: {
                placement,
            },
            message: "Placement created successfully",
        },
        { status: 201 },
    );
};

export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10)
    const companyId = req.nextUrl.searchParams.get("companyId");
    const where = companyId
        ? {
            companyId,
        }
        : {};
    const [placements, total] = await Promise.all([
        db.placement.findMany({
            where,
            skip: (page - 1) * limit,
            include: {
                company: true,
                photo: true
            },
            take: limit,
        }),
        db.placement.count({ where }),
    ]);
    return NextResponse.json({
        data: {
            placements,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "placements fetched successfully",
    });
};
