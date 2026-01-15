export function pickLocalized(
    map: Record<string, string> | null | undefined,
    locale: string,
    fallback = "en",
): string {
    if (!map) return "";

    const raw = (locale || fallback).toLowerCase();
    const short = raw.split("-")[0] ?? raw;

    return (
        map[raw] ??
        map[short] ??
        map[fallback] ??
        Object.values(map)[0] ??
        ""
    );
}