import { db } from "@/lib/db";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { CreateCourse, createCourseSchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const course = await db.course.findUnique({
        where: { id }
    });
    if (!course) {
        return NextResponse.json(
            { error: "Course not found" },
            { status: 404 }
        );
    }
    await db.course.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Course deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const formData = await req.formData();
    
    // Parse the FormData, handling JSON strings for nested objects
    const body: any = {
        title: formData.get("title"),
        description: formData.get("description"),
        thumbnail: formData.get("thumbnail"),
        additionalInfo: JSON.parse(formData.get("additionalInfo") as string),
        syllabus: JSON.parse(formData.get("syllabus") as string),
        targetAudiences: JSON.parse(formData.get("targetAudiences") as string),
    };

    let validatedData;
    try {
        validatedData = createCourseSchema.extend({
            thumbnail: z.file().optional(),
        }).parse(body);
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        );
    }

    const course = await db.course.findUnique({
        where: { id }
    });
    if (!course) {
        return NextResponse.json(
            { error: "Course not found" },
            { status: 404 }
        );
    }

    // Upload new thumbnail
    const thumbnailImage = validatedData.thumbnail ? await uploadAndSaveImage(validatedData.thumbnail, "COURSE") : undefined;

    const updatedCourse = await db.course.update({
        where: { id },
        data: {
            syllabus: {
                points: validatedData.syllabus.points,
                subtitle: validatedData.syllabus.subtitle,
                title: validatedData.syllabus.title
            },
            imageId: thumbnailImage?.id || course.imageId,
            additionalInfo: validatedData.additionalInfo,
            description: validatedData.description,
            targetAudiences: validatedData.targetAudiences,
            title: validatedData.title,
        },
        include: {
            thumbnail: true
        }
    });

    if (thumbnailImage && course.imageId) {
        await uploadService.delete(course.imageId);
        await db.image.delete({
            where: { id: course.imageId }
        })
    }
    
    // Transform to match expected schema
    const transformedCourse = {
        ...updatedCourse,
        thumbnailUrl: updatedCourse.thumbnail?.url || null
    };
    
    return NextResponse.json(
        {
            data: {
                course: transformedCourse,
            },
            message: "Course updated successfully",
        },
        { status: 200 }
    );
};

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const course = await db.course.findUnique({
        where: { id },
        include: {
            thumbnail: true
        }
    });
    
    if (!course) {
        return NextResponse.json(
            { error: "Course not found" },
            { status: 404 }
        );
    }
    
    // Transform to match expected schema
    const transformedCourse = {
        ...course,
        thumbnailUrl: course.thumbnail?.url || null
    };
    
    return NextResponse.json(
        {
            data: {
                course: transformedCourse,
            },
            message: "Course fetched successfully",
        },
        { status: 200 }
    );
};