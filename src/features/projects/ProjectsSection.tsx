"use client";

import {useTranslation} from "react-i18next";

import {AppTitle} from "@/components/ui/AppTitle";
import {ProjectCardsGrid} from "@/features/projects/ProjectCardsGrid";
import {usePetProjects} from "@/lib/features/projects/context";
import {ProjectsErrorBanner} from "@/features/projects/ProjectsErrorBanner";

export function ProjectsSection() {
    const {t, i18n} = useTranslation();
    const {data, status, error, refresh} = usePetProjects();

    const vms = data?.vms ?? [];
    const expectedCount = data?.count ?? 7;

    return (
        <section
            id="projects"
            className="scroll-mt-15 m:scroll-mt-12.5 px-(--lm) pt-17.5 pb-16"
        >
            <AppTitle
                title={t("petProjects.title")}
                subtitle={t("petProjects.subtitle")}
                align="left"
            />

            <div className="h-12 m:h-16"/>

            {status === "error" ? (
                <ProjectsErrorBanner error={error} onRetry={() => void refresh()}/>
            ) : null}

            <ProjectCardsGrid
                vms={status === "ready" ? vms : []}
                expectedCount={expectedCount}
                locale={i18n.language}
            />
        </section>
    );
}