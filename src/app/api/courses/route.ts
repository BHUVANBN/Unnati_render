import { db } from "@/lib/db";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { CreateCourse, createCourseSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        
        // Parse the FormData, handling JSON strings for nested objects
        const body: any = {
            title: formData.get("title"),
            description: formData.get("description"),
            thumbnail: formData.get("thumbnail"),
            additionalInfo: JSON.parse(formData.get("additionalInfo") as string || "{}"),
            syllabus: JSON.parse(formData.get("syllabus") as string || "{}"),
            targetAudiences: JSON.parse(formData.get("targetAudiences") as string || "[]"),
        };
        
        console.log("Parsed body:", body);
        
        let validatedData;
        try {
            validatedData = createCourseSchema.parse(body);
            console.log("Validated data:", validatedData);
        } catch (error) {
            console.error("Validation error:", error);
            return NextResponse.json(
                {
                    error: (error as z.ZodError).issues
                        .map((issue) => issue.message)
                        .join(", "),
                },
                { status: 400 },
            );
        }
        
        let thumbnailImage = null;
        if (validatedData.thumbnail && validatedData.thumbnail.size > 0) {
            thumbnailImage = await uploadAndSaveImage(validatedData.thumbnail, "COURSE");
        }
        
        console.log("Creating course with data:", {
            syllabus: validatedData.syllabus,
            imageId: thumbnailImage?.id,
            additionalInfo: validatedData.additionalInfo,
            description: validatedData.description,
            targetAudiences: validatedData.targetAudiences,
            title: validatedData.title,
        });
        
        const course = await db.course.create({
            data: {
                syllabus: {
                    points: validatedData.syllabus.points,
                    subtitle: validatedData.syllabus.subtitle,
                    title: validatedData.syllabus.title
                },
                imageId: thumbnailImage?.id,
                additionalInfo: validatedData.additionalInfo,
                description: validatedData.description,
                targetAudiences: validatedData.targetAudiences,
                title: validatedData.title,
            },
            include: {
                thumbnail: true
            }
        });
    
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
            message: "Course created successfully",
        },
        { status: 201 },
    );
    } catch (error) {
        console.error("Error creating course:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};
export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    const [courses, total] = await Promise.all([
        db.course.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                thumbnail: true
            }
        }),
        db.course.count(),
    ]);
    
    // Transform to match expected schema
    const transformedCourses = courses.map(course => ({
        ...course,
        thumbnail: course.thumbnail || null
    }));
    
    return NextResponse.json({
        data: {
            courses: transformedCourses,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "courses fetched successfully",
    });
};
