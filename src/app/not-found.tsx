"use client";

import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function NotFound() {
    const {t} = useTranslation();

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold">{t("notFound.title")}</h1>
            <p className="mt-2 text-accent-more">{t("notFound.subtitle")}</p>
            <Link className="mt-6 inline-block underline" href="/">
                {t("notFound.button")}
            </Link>
        </main>
    );
}