"use client";

import type {PetProjectCardVM} from "@/lib/features/projects/types";
import {ProjectCard} from "@/features/projects/ProjectCard";
import {ProjectCardSkeleton} from "@/features/projects/ProjectCardSkeleton";

type Props = {
    vms: PetProjectCardVM[];
    expectedCount: number;
    locale: string;
};

export function ProjectCardsGrid({vms, expectedCount, locale}: Props) {
    const actualCount = Math.max(vms.length, expectedCount);
    const skeletonCount = Math.max(0, actualCount - vms.length);

    return (
        <div
            className={[
                "grid",
                "gap-5 m:gap-6 xl:gap-7",
                "grid-cols-1",
                "s:grid-cols-2",
                "m:grid-cols-3",
                "l:grid-cols-4",
                "xl:grid-cols-5",
                "xxl:grid-cols-6",
                "max-w-300 xl:max-w-330 xxl:max-w-370",
                "mx-auto",
            ].join(" ")}
        >
            {vms.map((vm, index) => (
                <ProjectCard key={`${vm.data.id}-${index}`} vm={vm} locale={locale}/>
            ))}

            {Array.from({length: skeletonCount}).map((_, i) => (
                <ProjectCardSkeleton key={`s-${i}`}/>
            ))}
        </div>
    );
}