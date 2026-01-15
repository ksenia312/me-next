import {NextResponse} from "next/server";
import {getAdminFirestore} from "@/lib/shared/server/firebaseAdmin";
import type {FirestorePetProjectDoc} from "@/lib/features/projects/types";
import {fetchGithubReadmeMarkdown} from "@/lib/features/markdown/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ id: string }> },
) {
    const {id} = await ctx.params;

    const db = getAdminFirestore();
    const snap = await db.collection("pet-projects").doc(id).get();
    if (!snap.exists) {
        return NextResponse.json({markdown: null}, {status: 404});
    }

    const doc = snap.data() as FirestorePetProjectDoc;
    const github = doc.github ?? null;

    if (!github) {
        return NextResponse.json({markdown: null}, {status: 200});
    }

    const markdown = await fetchGithubReadmeMarkdown(github);
    return NextResponse.json({markdown}, {status: 200});
}