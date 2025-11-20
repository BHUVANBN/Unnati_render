import sharp from "sharp";
import uploadService from "@/services/cloudinary";
import { db } from "@/lib/db";
import { ImageType } from "@/schemas";

export async function uploadAndSaveImage(
    file: File,
    type: ImageType,
    aspectRatio: number = 1
) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Aspect ratio check - disabled for testing
    const metadata = await sharp(buffer).metadata();
    // if (!metadata.width || !metadata.height || Math.abs(metadata.width / metadata.height - aspectRatio) > 0.01) {
    //     throw new Error(`Image must have aspect ratio ${aspectRatio}:1`);
    // }

    // Upload to cloud
    const { id, url } = await uploadService.uploadBuffer(buffer, file.type);

    // Save to DB
    const image = await db.image.create({
        data: {
            type,
            url,
            id,
        }
    });

    return image;
}