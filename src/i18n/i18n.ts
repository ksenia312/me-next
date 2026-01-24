"use client";

import i18n, {type Resource} from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

import de from "../translations/de.json";
import en from "../translations/en.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";
import hi from "../translations/hi.json";
import it from "../translations/it.json";
import ja from "../translations/ja.json";
import ko from "../translations/ko.json";
import nl from "../translations/nl.json";
import pt from "../translations/pt.json";
import ru from "../translations/ru.json";
import tr from "../translations/tr.json";
import zh from "../translations/zh.json";

export const supportedLanguages = [
    "en",
    "nl",
    "ru",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ja",
    "ko",
    "zh",
    "hi",
    "tr",
] as const;

export type SupportedLocale = (typeof supportedLanguages)[number];

export const fallbackLng: SupportedLocale = "en";

const resources = {
    en: {translation: en},
    ru: {translation: ru},
    es: {translation: es},
    fr: {translation: fr},
    de: {translation: de},
    it: {translation: it},
    pt: {translation: pt},
    ja: {translation: ja},
    ko: {translation: ko},
    zh: {translation: zh},
    hi: {translation: hi},
    tr: {translation: tr},
    nl: {translation: nl},
} satisfies Resource;

if (!i18n.isInitialized) {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng,
            supportedLngs: [...supportedLanguages],
            interpolation: {escapeValue: false},
            detection: {
                order: ["localStorage", "navigator"],
                caches: ["localStorage"],
                lookupLocalStorage: "locale",
            },
            keySeparator: ".",
        });
}

export {i18n};