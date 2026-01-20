import "server-only";

import {getAdminFirestore} from "@/lib/shared/server/firebaseAdmin";
import {getStableSignedUrl} from "@/lib/shared/server/stableSignedUrl";
import {mapDocToData} from "@/lib/features/projects/mapper";
import type {
    FirestorePetProjectDoc,
    PetProjectCardsResult,
    PetProjectCardVM,
    PetProjectPageVM,
} from "@/lib/features/projects/types";

const SIGNED_URL_TTL_MS = 1000 * 10;

function normalizeDocId(input: unknown): string | null {
    if (typeof input !== "string") return null;
    const id = input.trim();
    if (!id || id.includes("/")) return null;
    return id;
}

function normalizeStoragePath(input: unknown): string | null {
    if (typeof input !== "string") return null;
    const v = input.trim();
    return v ? v : null;
}

function withCacheBuster(url: string): string {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${Date.now()}`;
}

async function getSignedUrlOrNull(path: string | null | undefined) {
    if (!path) return null;
    const normalized = normalizeStoragePath(path);
    if (!normalized) return null;

    const url = await getStableSignedUrl(normalized, {ttlMs: SIGNED_URL_TTL_MS});
    return withCacheBuster(url);
}

export async function getPetProjectCards(): Promise<PetProjectCardsResult> {
    const db = getAdminFirestore();
    const snap = await db.collection("pet-projects").get();

    const list: PetProjectCardVM[] = await Promise.all(
        snap.docs.map(async (d) => {
            const doc = d.data() as FirestorePetProjectDoc;
            const data = mapDocToData(d.id, doc);

            const imageUrl = (await getSignedUrlOrNull(data.imageStoragePath)) ?? "";

            return {data, imageUrl};
        }),
    );

    const vms = list.sort((a, b) => a.data.order - b.data.order);
    return {vms, count: vms.length};
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

    const [coverImageUrl, androidDemoUrl, iosDemoUrl] = await Promise.all([
        getSignedUrlOrNull(data.imageStoragePath),
        getSignedUrlOrNull(data.androidStoragePath),
        getSignedUrlOrNull(data.iosStoragePath),
    ]);

    return {
        data,
        coverImageUrl,
        androidDemoUrl,
        iosDemoUrl,
    };
}