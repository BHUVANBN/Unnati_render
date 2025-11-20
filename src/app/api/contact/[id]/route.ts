import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const contact = await db.contact.findUnique({
        where: { id }
    });
    if (!contact) {
        return NextResponse.json(
            { error: "Contact not found" },
            { status: 404 }
        );
    }
    await db.contact.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Contact deleted successfully" },
        { status: 200 }
    );
}