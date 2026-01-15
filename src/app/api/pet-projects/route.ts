import {NextResponse} from "next/server";
import {getPetProjectCards} from "@/lib/features/projects/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const data = await getPetProjectCards();
    return NextResponse.json(data, {
        headers: {
            "Cache-Control": "no-store",
        },
    });
}