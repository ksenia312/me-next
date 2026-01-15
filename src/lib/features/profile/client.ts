const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_PER_YEAR = 365.2425;

export function yearsSince(isoDateUtc: string, now: Date = new Date()): number {
    const startMs = Date.parse(isoDateUtc);
    if (Number.isNaN(startMs)) return 0;

    const diffMs = now.getTime() - startMs;
    if (diffMs <= 0) return 0;

    const years = diffMs / (MS_PER_DAY * DAYS_PER_YEAR);
    return Math.round(years * 10) / 10;
}

export const links = {
    package: "https://pub.dev/packages/nearby_service",
    app: "https://play.google.com/store/apps/details?id=com.xenikii.conneqt",
} as const;

export const experience = {
    overallYears: () => yearsSince("2018-09-01T00:00:00Z"),
    flutterYears: () => yearsSince("2022-03-01T00:00:00Z"),
} as const;