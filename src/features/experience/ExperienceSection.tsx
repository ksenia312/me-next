"use client";

import {useTranslation} from "react-i18next";

import {AppTitle} from "@/components/ui/AppTitle";
import {useExperienceItems} from "@/hooks/useExperienceItems";
import {ExperienceTimeline} from "@/features/experience/ExperienceTimeline";
import {CVBlock} from "@/features/experience/CVBlock";

export function ExperienceSection() {
    const {t} = useTranslation();
    const items = useExperienceItems();

    return (
        <section
            id="experience"
            className="w-full scroll-mt-15 m:scroll-mt-12.5 px-(--lm) pt-17.5 pb-16"
        >
            <AppTitle
                title={t("experience.title")}
                subtitle={t("experience.subtitle")}
                align="left"
            />

            <div className="mt-10 mx-auto w-full max-w-6xl">
                <ExperienceTimeline items={items}/>

                <div className="mt-18">
                    <CVBlock/>
                </div>
            </div>
        </section>
    );
}