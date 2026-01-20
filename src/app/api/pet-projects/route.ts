import {NextResponse} from "next/server";
import {getPetProjectCards} from "@/lib/features/projects/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    const data = await getPetProjectCards();

    return NextResponse.json(data, {
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
    });
}