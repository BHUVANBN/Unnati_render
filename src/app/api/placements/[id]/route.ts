import { db } from "@/lib/db";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { CreatePlacement, createPlacementSchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const placement = await db.placement.findUnique({
        where: { id }
    });
    if (!placement) {
        return NextResponse.json(
            { error: "Placement not found" },
            { status: 404 }
        );
    }
    await db.placement.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Placement deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
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
        validatedData = createPlacementSchema.extend({
            image: z.file().optional()
        }).parse(body);
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const placement = await db.placement.findUnique({
        where: { id }
    });
    if (!placement) {
        return NextResponse.json(
            { error: "Placement not found" },
            { status: 404 }
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
    const uploadedImage = validatedData.image ? await uploadAndSaveImage(validatedData.image, "PLACEMENT") : undefined;
    const updatedPlacement = await db.placement.update({
        where: { id },
        data: {
            companyId: validatedData.companyId,
            imageId: uploadedImage?.id,
            name: validatedData.name,
            role: validatedData.role
        }
    });

    if (uploadedImage) {
        // delete old image
        await uploadService.delete(placement.imageId as string);
        await db.image.delete({
            where: { id: placement.imageId }
        })
    }
    return NextResponse.json(
        {
            data: {
                placement: updatedPlacement
            },
            message: "Placement updated successfully"
        },
        { status: 200 }
    );
}