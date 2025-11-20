import { db } from "@/lib/db";
import { CreateTrainer, createTrainerSchema } from "@/schemas";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import uploadService from "@/services/cloudinary";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const trainer = await db.trainer.findUnique({
        where: { id }
    });
    if (!trainer) {
        return NextResponse.json(
            { error: "Trainer not found" },
            { status: 404 }
        );
    }
    await db.trainer.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Trainer deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const formData = await req.formData();
    const body = Object.fromEntries(formData) as unknown as CreateTrainer;
    let validatedData;
    try {
        validatedData = createTrainerSchema.parse(body);
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        );
    }
    const trainer = await db.trainer.findUnique({
        where: { id }
    });
    if (!trainer) {
        return NextResponse.json(
            { error: "Trainer not found" },
            { status: 404 }
        );
    }
    const photo = validatedData.photo ? await uploadAndSaveImage(validatedData.photo, "HERO") : undefined;
    const updatedTrainer = await db.trainer.update({
        where: { id },
        data: {
            bio: validatedData.bio,
            name: validatedData.name,
            designation: validatedData.designation,
            imageId: photo?.id,
            experience: validatedData.experience,
            expertise: validatedData.expertise,
        }
    });

    if (photo) {
        await uploadService.delete(trainer.imageId as string);
        if (trainer.imageId) {
            await db.image.delete({
                where: {
                    id: trainer.imageId
                }
            })
        }
    }

    return NextResponse.json(
        {
            data: {
                trainer: updatedTrainer
            },
            message: "Trainer updated successfully"
        },
        { status: 200 }
    );
}