import type {FirestorePetProjectDoc, PetProjectData} from "@/lib/features/projects/types";

function safeParseMap(json?: string): Record<string, string> {
    if (!json) return {};

    try {
        const v = JSON.parse(json) as Record<string, unknown>;
        const out: Record<string, string> = {};

        for (const [k, val] of Object.entries(v ?? {})) {
            if (typeof val === "string") out[k] = val;
        }

        return out;
    } catch {
        return {};
    }
}

function normalizeAccentColor(color: string): string {
    const c = (color ?? "").trim();
    if (!c) return "#0B1020";
    if (c.startsWith("#")) return c;
    if (c.startsWith("0x") && c.length >= 8) return `#${c.slice(-6)}`;
    return c;
}

export function mapDocToData(id: string, doc: FirestorePetProjectDoc): PetProjectData {
    return {
        id,
        order: doc.order ?? 10000,
        titles: safeParseMap(doc.titleJson),
        subtitles: safeParseMap(doc.subtitleJson),
        imageStoragePath: doc.imageStoragePath,
        accentColor: normalizeAccentColor(doc.color),
        androidStoragePath: doc.androidDemo ?? null,
        androidDemoAspectRatio: doc.androidDemoAspectRatio ?? null,
        iosStoragePath: doc.iosDemo ?? null,
        iosDemoAspectRatio: doc.iosDemoAspectRatio ?? null,
        githubLink: doc.github ?? null,
        googlePlayLink: doc.googlePlay ?? null,
        websiteLink: doc.website ?? null,
    };
}