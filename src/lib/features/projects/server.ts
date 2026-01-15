import "server-only";

import {getAdminFirestore} from "@/lib/shared/server/firebaseAdmin";
import {getStableSignedUrl} from "@/lib/shared/server/stableSignedUrl";
import {mapDocToData} from "@/lib/features/projects/mapper";
import type {FirestorePetProjectDoc, PetProjectCardsResult, PetProjectCardVM,} from "@/lib/features/projects/types";

const SIGNED_URL_TTL_MS = 1000 * 60 * 60 * 24;

export async function getPetProjectCards(): Promise<PetProjectCardsResult> {
    const db = getAdminFirestore();

    const snap = await db.collection("pet-projects").get();

    const list: PetProjectCardVM[] = await Promise.all(
        snap.docs.map(async (d) => {
            const doc = d.data() as FirestorePetProjectDoc;
            const data = mapDocToData(d.id, doc);

            let imageUrl = "";

            if (data.imageStoragePath) {
                imageUrl = await getStableSignedUrl(data.imageStoragePath, {
                    ttlMs: SIGNED_URL_TTL_MS,
                });
            }

            return {data, imageUrl};
        }),
    );

    const vms = list.sort((a, b) => a.data.order - b.data.order);
    return {vms, count: vms.length};
}