import "server-only";

import {getAdminFirestore} from "@/lib/shared/server/firebaseAdmin";
import {mapDocToData} from "@/lib/features/projects/mapper";
import type {
    FirestorePetProjectDoc,
    PetProjectCardsResult,
    PetProjectCardVM,
    PetProjectPageVM,
} from "@/lib/features/projects/types";

function normalizeDocId(input: unknown): string | null {
    if (typeof input !== "string") return null;
    const id = input.trim();
    if (!id || id.includes("/")) return null;
    return id;
}

function getResourceUrl(path: string | null | undefined) {
    if (!path) return null;
    return `https://firebasestorage.googleapis.com/v0/b/xenikii-d8064.appspot.com/o/${path}?alt=media`
}

export async function getPetProjectCards(): Promise<PetProjectCardsResult> {
    const db = getAdminFirestore();
    const snap = await db.collection("pet-projects").get();

    const list: PetProjectCardVM[] = await Promise.all(
        snap.docs.map(async (d) => {
            const doc = d.data() as FirestorePetProjectDoc;
            const data = mapDocToData(d.id, doc);

            console.log(data.imageStoragePath)

            const imageUrl = getResourceUrl(data.imageStoragePath)
            return {data, imageUrl};
        }),
    );

    const vms = list.sort((a, b) => a.data.order - b.data.order);
    return {vms, count: vms.length};
}

export async function getPetProjectPageVM(idInput: unknown): Promise<PetProjectPageVM | null> {
    const id = normalizeDocId(idInput);
    if (!id) return null;

    const db = getAdminFirestore();
    const docSnap = await db.collection("pet-projects").doc(id).get();

    if (!docSnap.exists) return null;

    const doc = docSnap.data() as FirestorePetProjectDoc;
    const data = mapDocToData(docSnap.id, doc);

    const [coverImageUrl, androidDemoUrl, iosDemoUrl] = await Promise.all([
        getResourceUrl(data.imageStoragePath),
        getResourceUrl(data.androidStoragePath),
        getResourceUrl(data.iosStoragePath),
    ]);

    return {
        data,
        coverImageUrl,
        androidDemoUrl,
        iosDemoUrl,
    };
}