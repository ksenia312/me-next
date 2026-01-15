import {NextResponse} from "next/server";
import {getAdminStorage} from "@/lib/shared/server/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CV_PATH = "Kseniia_CV.pdf";
const SIGNED_URL_TTL_MS = 1000 * 60 * 10;

export async function GET() {
    const bucket = getAdminStorage().bucket();
    const file = bucket.file(CV_PATH);

    const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + SIGNED_URL_TTL_MS,
    });

    return NextResponse.redirect(url, {status: 302});
}