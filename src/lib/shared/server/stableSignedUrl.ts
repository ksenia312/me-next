import "server-only";

import {getAdminStorage} from "@/lib/shared/server/firebaseAdmin";

type Options = {
    ttlMs: number;
};

export async function getStableSignedUrl(
    storagePath: string,
    {ttlMs}: Options,
): Promise<string> {
    const storage = getAdminStorage();
    const bucket = storage.bucket();
    const file = bucket.file(storagePath);

    const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + ttlMs,
    });

    return url;
}