"use client";

import {useTranslation} from "react-i18next";

import {AppChip} from "@/components/ui/AppChip";
import {AppTitle} from "@/components/ui/AppTitle";
import {MainImage} from "@/features/welcome/MainImage";

export function WelcomeSection() {
    const {t} = useTranslation();

    const chips = [
        t("skill.teamPlayer"),
        t("skill.communicative"),
        t("skill.problemSolver"),
        t("skill.leader"),
        t("skill.nonConflictual"),
    ];

    return (
        <section
            id="welcome"
            className="w-full"
            style={{
                background:
                    "linear-gradient(to bottom, var(--color-gradient-extra-light), var(--color-gradient-dark))",
            }}
        >
            <div
                className="w-full pt-23 m:pt-20.5"
                style={{
                    paddingLeft: "var(--lm)",
                    paddingRight: "var(--lm)",
                }}
            >
                <AppTitle
                    title={t("welcome.title")}
                    subtitle={t("welcome.subtitle")}
                    align="right"
                />

                <div style={{height: "var(--sp-x10)"}}/>

                <div className="block m:hidden">
                    <div className="mx-auto max-w-100">
                        <div
                            className="flex flex-wrap justify-center"
                            style={{gap: "var(--gap-lg)"}}
                        >
                            {chips.map((c) => (
                                <AppChip key={c} text={c}/>
                            ))}
                        </div>
                    </div>

                    <div style={{height: "var(--sp-x10)"}}/>

                    <div className="flex justify-center">
                        <MainImage/>
                    </div>
                </div>

                <div className="hidden m:flex w-full items-center justify-between gap-10">
                    <div className="flex-2">
                        <MainImage/>
                    </div>

                    <div className="flex-1">
                        <div className="ml-auto max-w-100">
                            <div
                                className="flex flex-wrap justify-end"
                                style={{gap: "var(--gap-lg)"}}
                            >
                                {chips.map((c) => (
                                    <AppChip key={c} text={c}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-10"/>
            </div>
        </section>
    );
}