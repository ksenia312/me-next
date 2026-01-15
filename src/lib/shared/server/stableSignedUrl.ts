import "server-only";

import {getAdminStorage} from "@/lib/shared/server/firebaseAdmin";

type Options = {
    ttlMs: number;
};

function stableExpiresMs(ttlMs: number, nowMs: number) {
    const bucket = Math.floor(nowMs / ttlMs) + 1;
    return bucket * ttlMs;
}

export async function getStableSignedUrl(
    storagePath: string,
    {ttlMs}: Options,
): Promise<string> {
    const storage = getAdminStorage();
    const bucket = storage.bucket();
    const file = bucket.file(storagePath);

    const [url] = await file.getSignedUrl({
        action: "read",
        expires: stableExpiresMs(ttlMs, Date.now()),
    });

    return url;
}