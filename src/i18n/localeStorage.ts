import {supportedLanguages, type SupportedLocale} from "@/i18n/i18n";

export function readStoredLocale(): SupportedLocale | null {
    try {
        const v = localStorage.getItem("locale");
        if (!v) return null;

        return supportedLanguages.includes(v as SupportedLocale)
            ? (v as SupportedLocale)
            : null;
    } catch {
        return null;
    }
}

export function writeStoredLocale(lng: SupportedLocale) {
    try {
        localStorage.setItem("locale", lng);
    } catch {
    }
}