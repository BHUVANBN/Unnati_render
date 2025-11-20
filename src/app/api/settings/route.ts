import { db } from "@/lib/db";
import { uploadAndSaveImage } from "@/lib/upload-image";
import { CreateSetting, createSettingSchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// Settings API route - handles CRUD operations for site settings

export async function GET() {
    const setting = await db.setting.findFirst();
    const response = NextResponse.json(
        {
            data: {
                setting
            },
            message: setting ? "Setting fetched successfully" : "No settings found"
        },
        { status: 200 }
    );
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
}

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const body: any = {};
        for (const [key, value] of formData.entries()) {
            if (key === 'socialLinks' || key === 'stats') {
                try {
                    body[key] = JSON.parse(value as string);
                } catch (e) {
                    body[key] = {};
                }
            } else {
                body[key] = value;
            }
        }
        let validatedData;
        try {
            validatedData = createSettingSchema.parse(body);
        } catch (error) {
            return NextResponse.json(
                { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
                { status: 400 }
            )
        }
        const logo = validatedData.logo && validatedData.logo instanceof File ? await uploadAndSaveImage(validatedData.logo, "LOGO") : undefined
        const backgroundImage = validatedData.backgroundImage && validatedData.backgroundImage instanceof File ? await uploadAndSaveImage(validatedData.backgroundImage, "BACKGROUND") : undefined
        const setting = await db.setting.create({
            data: {
                address: validatedData.address,
                email: validatedData.email,
                introParagraph: validatedData.introParagraph,
                phone: validatedData.phone,
                logoId: logo?.id,
                backgroundImageId: backgroundImage?.id,
                socialLinks: validatedData.socialLinks,
                stats: validatedData.stats,
                welcomeText: validatedData.welcomeText,
            }
        });
        return NextResponse.json(
            {
                data: {
                    setting
                },
                message: "Setting created successfully"
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/settings error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        )
    }
}

export const DELETE = async () => {
    const setting = await db.setting.findFirst();
    if (!setting) {
        return NextResponse.json(
            { error: "Setting not found" },
            { status: 404 }
        );
    }
    await db.setting.delete({
        where: { id: setting.id }
    });
    return NextResponse.json(
        { message: "Setting deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const body: any = {};
        for (const [key, value] of formData.entries()) {
            if (key === 'socialLinks' || key === 'stats') {
                try {
                    body[key] = JSON.parse(value as string);
                } catch (e) {
                    body[key] = {};
                }
            } else {
                body[key] = value;
            }
        }
        let validatedData;
        try {
            validatedData = createSettingSchema.parse(body);
        } catch (error) {
            return NextResponse.json(
                { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
                { status: 400 }
            )
        }
        const setting = await db.setting.findFirst();
        if (!setting) {
            return NextResponse.json(
                { error: "Setting not found" },
                { status: 404 }
            );
        }
        const logo = validatedData.logo && validatedData.logo instanceof File ? await uploadAndSaveImage(validatedData.logo, "LOGO") : undefined
        const backgroundImage = validatedData.backgroundImage && validatedData.backgroundImage instanceof File ? await uploadAndSaveImage(validatedData.backgroundImage, "BACKGROUND") : undefined
        const updatedSetting = await db.setting.update({
            where: { id: setting.id },
            data: {
                address: validatedData.address,
                email: validatedData.email,
                introParagraph: validatedData.introParagraph,
                phone: validatedData.phone,
                logoId: logo?.id,
                backgroundImageId: backgroundImage?.id,
                socialLinks: validatedData.socialLinks,
                stats: validatedData.stats,
                welcomeText: validatedData.welcomeText,
            }
        });
        if (logo) {
            // delete old logo
            if (setting.logoId) {
                await uploadService.delete(setting.logoId);
                await db.image.delete({
                    where: { id: setting.logoId }
                })
            }
        }
        if (backgroundImage) {
            // delete old background image
            if (setting.backgroundImageId) {
                await uploadService.delete(setting.backgroundImageId);
                await db.image.delete({
                    where: { id: setting.backgroundImageId }
                })
            }
        }
        return NextResponse.json(
            {
                data: {
                    setting: updatedSetting
                },
                message: "Setting updated successfully"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('PUT /api/settings error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        )
    }
}
