import "server-only";

import {getAdminFirestore} from "@/lib/shared/server/firebaseAdmin";
import {getStableSignedUrl} from "@/lib/shared/server/stableSignedUrl";
import {mapDocToData} from "@/lib/features/projects/mapper";
import type {FirestorePetProjectDoc, PetProjectPageVM,} from "@/lib/features/projects/types";

const SIGNED_URL_TTL_MS = 1000 * 60 * 60 * 24;

function normalizeDocId(input: unknown): string | null {
    if (typeof input !== "string") return null;

    const id = input.trim();
    if (!id) return null;
    if (id.includes("/")) return null;

    return id;
}

function normalizeStoragePath(input: unknown): string | null {
    if (typeof input !== "string") return null;
    const v = input.trim();
    return v ? v : null;
}

export async function getPetProjectPageVM(
    idInput: unknown,
): Promise<PetProjectPageVM | null> {
    const id = normalizeDocId(idInput);
    if (!id) return null;

    const db = getAdminFirestore();

    const docSnap = await db.collection("pet-projects").doc(id).get();
    if (!docSnap.exists) return null;

    const doc = docSnap.data() as FirestorePetProjectDoc;
    const data = mapDocToData(docSnap.id, doc);

    const coverPath = normalizeStoragePath(data.imageStoragePath);
    const androidPath = normalizeStoragePath(data.androidStoragePath);
    const iosPath = normalizeStoragePath(data.iosStoragePath);

    const [coverImageUrl, androidDemoUrl, iosDemoUrl] = await Promise.all([
        coverPath
            ? getStableSignedUrl(coverPath, {ttlMs: SIGNED_URL_TTL_MS})
            : Promise.resolve(null),
        androidPath
            ? getStableSignedUrl(androidPath, {ttlMs: SIGNED_URL_TTL_MS})
            : Promise.resolve(null),
        iosPath
            ? getStableSignedUrl(iosPath, {ttlMs: SIGNED_URL_TTL_MS})
            : Promise.resolve(null),
    ]);

    return {
        data,
        coverImageUrl,
        androidDemoUrl,
        iosDemoUrl,
    };
}