"use client";

import {useTranslation} from "react-i18next";

import {AppTitle} from "@/components/ui/AppTitle";
import {WaveSection} from "@/features/wave/WaveSection";
import {experience} from "@/lib/features/profile/client";
import {SummaryCoinsGrid} from "@/features/summary/SummaryCoinsGrid";

export function SummarySection() {
    const {t} = useTranslation();

    const overall = experience.overallYears();
    const flutter = experience.flutterYears();

    return (
        <WaveSection wideFromPx={1000}>
            <section
                id="summary"
                className="mx-auto w-full scroll-mt-15 m:scroll-mt-12.5 px-(--lm) pt-10 pb-16"
            >
                <AppTitle
                    title={t("summary.title")}
                    subtitle={t("summary.subtitle")}
                    align="left"
                />

                <div className="mx-auto mt-12 w-full max-w-5xl">
                    <SummaryCoinsGrid t={t} overall={overall} flutter={flutter}/>
                </div>
            </section>
        </WaveSection>
    );
}