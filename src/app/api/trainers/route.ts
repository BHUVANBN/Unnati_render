import { db } from "@/lib/db";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { CreateTrainer, createTrainerAPISchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const body: any = {};
        for (const [key, value] of formData.entries()) {
            // Don't include photo in the body if it's a file
            if (key !== 'photo') {
                body[key] = value;
            }
        }
        console.log('POST /api/trainers received body:', body);
        
        let validatedData;
        try {
            validatedData = createTrainerAPISchema.parse(body);
            console.log('POST /api/trainers validated data:', validatedData);
        } catch (error) {
            console.log('POST /api/trainers validation error:', error);
            return NextResponse.json(
                {
                    error: (error as z.ZodError).issues
                        .map((issue) => issue.message)
                        .join(", "),
                },
                { status: 400 },
            );
        }
        
        let photo;
        const photoFile = formData.get('photo') as File;
        if (photoFile && photoFile instanceof File && photoFile.size > 0) {
            photo = await uploadAndSaveImage(photoFile, "TRAINER");
        }
        const trainer = await db.trainer.create({
            data: {
                bio: validatedData.bio || "",
                name: validatedData.name,
                designation: validatedData.designation,
                imageId: photo?.id || null,
                experience: validatedData.experience,
                expertise: validatedData.expertise,
            },
            include: {
                photo: true
            }
        });
        
        // Transform to match the expected schema
        const transformedTrainer = {
            ...trainer,
            photoUrl: trainer.photo?.url || null
        };
        
        return NextResponse.json(
            {
                data: {
                    trainer: transformedTrainer,
                },
                message: "Trainer created successfully",
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('POST /api/trainers error:', error);
        console.error('POST /api/trainers stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};

export const GET = async () => {
    try {
        const trainers = await db.trainer.findMany({
            include: {
                photo: true
            }
        });
        
        // Transform to match the expected schema
        const transformedTrainers = trainers.map(trainer => ({
            ...trainer,
            photoUrl: trainer.photo?.url || null
        }));
        
        return NextResponse.json({
            data: {
                trainers: transformedTrainers,
            },
            message: "Trainers fetched successfully",
        });
    } catch (error) {
        console.error('GET /api/trainers error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { error: "Trainer ID is required" },
                { status: 400 }
            );
        }

        const formData = await req.formData();
        const body: any = {};
        for (const [key, value] of formData.entries()) {
            // Don't include photo in the body if it's a file
            if (key !== 'photo') {
                body[key] = value;
            }
        }
        
        let validatedData;
        try {
            validatedData = createTrainerAPISchema.parse(body);
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
        
        const trainer = await db.trainer.findUnique({
            where: { id },
            include: {
                photo: true
            }
        });
        
        if (!trainer) {
            return NextResponse.json(
                { error: "Trainer not found" },
                { status: 404 }
            );
        }
        
        let photo;
        const photoFile = formData.get('photo') as File;
        if (photoFile && photoFile instanceof File && photoFile.size > 0) {
            photo = await uploadAndSaveImage(photoFile, "TRAINER");
        }
        
        const updatedTrainer = await db.trainer.update({
            where: { id },
            data: {
                bio: validatedData.bio,
                name: validatedData.name,
                designation: validatedData.designation,
                imageId: photo?.id || trainer.imageId,
                experience: validatedData.experience,
                expertise: validatedData.expertise,
            },
            include: {
                photo: true
            }
        });
        
        // Transform to match the expected schema
        const transformedTrainer = {
            ...updatedTrainer,
            photoUrl: updatedTrainer.photo?.url || null
        };
        
        // Delete old image if new one was uploaded
        if (photo && trainer.imageId) {
            await uploadService.delete(trainer.imageId);
            await db.image.delete({
                where: { id: trainer.imageId }
            });
        }
        
        return NextResponse.json(
            {
                data: {
                    trainer: transformedTrainer,
                },
                message: "Trainer updated successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('PUT /api/trainers error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { error: "Trainer ID is required" },
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
        
        await db.trainer.delete({
            where: { id }
        });
        
        // Delete associated image
        if (trainer.imageId) {
            await uploadService.delete(trainer.imageId);
            await db.image.delete({
                where: { id: trainer.imageId }
            });
        }
        
        return NextResponse.json(
            {
                message: "Trainer deleted successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('DELETE /api/trainers error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
};
