import type {SupportedLocale} from "@/i18n/i18n";

export function localePrettyName(locale: SupportedLocale): string {
    switch (locale) {
        case "en":
            return "English";
        case "ru":
            return "Русский";
        case "fr":
            return "Français";
        case "tr":
            return "Türkçe";
        case "de":
            return "Deutsch";
        case "es":
            return "Español";
        case "hi":
            return "हिंदी";
        case "it":
            return "Italiana";
        case "ja":
            return "日本語";
        case "ko":
            return "한국인";
        case "nl":
            return "Nederlands";
        case "pt":
            return "Portugal";
        case "zh":
            return "中国人";
        default:
            return (locale as SupportedLocale).toUpperCase();
    }
}