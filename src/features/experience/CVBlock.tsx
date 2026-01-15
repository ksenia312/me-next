"use client";

import {useTranslation} from "react-i18next";
import AppButton from "@/components/ui/AppButton";

export function CVBlock() {
    const {t} = useTranslation();

    return (
        <div className="flex flex-col items-center gap-4 pt-8 text-center">
            <div className="text-on-surface/80">{t("experience.cv.caption")}</div>
            <AppButton
                as="a"
                size="default"
                href="/api/cv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-65"
            >
                {t("experience.cv.button")}
            </AppButton>
        </div>
    );
}