"use client";

import {useMemo} from "react";
import {useTranslation} from "react-i18next";

import type {PetProjectPageVM} from "@/lib/features/projects/types";
import {usePetProjectReadme} from "@/hooks/usePetProjectReadme";
import {PetProjectHero} from "@/features/pet-project/PetProjectHero";
import {PetProjectReadmeCard} from "@/features/pet-project/PetProjectReadmeCard";
import {PetProjectDemo} from "@/features/pet-project/PetProjectDemo";
import {ScrollToTopButton} from "@/features/pet-project/ScrollToTopButton";
import {Header} from "@/components/layout/header/Header";
import {pickLocalized} from "@/components/i18n/pickLocalized";
import {Footer} from "@/components/layout/footer/Footer";
import {PetProjectTitle} from "@/features/pet-project/PetProjectTitle";


export function PetProjectPageClient({
                                         id,
                                         vm,
                                     }: {
    id: string;
    vm: PetProjectPageVM | null;
}) {
    const {t, i18n} = useTranslation();

    const data = vm?.data ?? null;

    const title = useMemo(() => {
        if (!data) return "";
        return pickLocalized(data.titles, i18n.language).toUpperCase();
    }, [data, i18n.language]);

    const subtitle = useMemo(() => {
        if (!data) return "";
        return pickLocalized(data.subtitles, i18n.language);
    }, [data, i18n.language]);

    const {markdown, status: markdownStatus} = usePetProjectReadme({
        id,
        enabled: Boolean(data?.githubLink),
    });

    if (!vm) {
        return (
            <>
                <Header variant="detail"/>

                <PetProjectHero
                    id={id}
                    background={"color-mix(in srgb, var(--color-error) 20%, transparent)"}
                    coverImageUrl={null}
                    showErrorIcon
                />

                <div className="mx-auto px-(--lm) py-10">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        {String(
                            t("petProjects.error.title", {defaultValue: "Error"}),
                        ).toUpperCase()}
                    </h1>

                    <p className="mt-4 text-on-surface/80">
                        {String(
                            t("petProjects.error.subtitle", {
                                defaultValue: `Can't load project: ${id}`,
                                id,
                            }),
                        )}
                    </p>
                </div>

                <Footer/>
            </>
        );
    }

    const heroBackground =
        vm.data.accentColor || "var(--color-gradient-extra-light)";

    const coverMissing = !vm.coverImageUrl;

    return (
        <>
            <Header variant="detail"/>

            <PetProjectHero
                id={id}
                background={heroBackground}
                coverImageUrl={vm.coverImageUrl}
                showErrorIcon={coverMissing}
            />

            <ScrollToTopButton/>

            <div className="mx-auto px-(--lm)">
                <PetProjectTitle title={title} subtitle={subtitle} data={vm.data}/>

                {vm.data.githubLink ? (
                    <div className="mt-10">
                        <PetProjectReadmeCard
                            status={markdownStatus}
                            markdown={markdown}
                            title="README.md"
                            sourceUrl={vm.data.githubLink}
                        />
                    </div>
                ) : null}

                {vm.androidDemoUrl || vm.iosDemoUrl ? (
                    <div className="mt-10 space-y-10">
                        {vm.androidDemoUrl ? (
                            <PetProjectDemo
                                title={String(t("androidDemo", {defaultValue: "Android demo"}))}
                                url={vm.androidDemoUrl}
                            />
                        ) : null}

                        {vm.iosDemoUrl ? (
                            <PetProjectDemo
                                title={String(t("iosDemo", {defaultValue: "iOS demo"}))}
                                url={vm.iosDemoUrl}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>

            <div className="mt-12">
                <Footer/>
            </div>
        </>
    );
}