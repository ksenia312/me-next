import type {PetProjectCardsResult} from "@/lib/features/projects/types";

export async function fetchPetProjectCards(): Promise<PetProjectCardsResult> {
    const res = await fetch("/api/pet-projects", {
        cache: "no-store",
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to load pet projects: ${res.status}`);
    }

    return (await res.json()) as PetProjectCardsResult;
}