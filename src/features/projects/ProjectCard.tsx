"use client";

import Image from "next/image";
import Link from "next/link";
import {useCallback} from "react";
import {useRouter} from "next/navigation";

import type {PetProjectCardVM} from "@/lib/features/projects/types";
import {setPetProjectThumb} from "@/lib/shared/client/petProjectThumbCache";
import {cn} from "@/lib/cn";
import {pickLocalized} from "@/components/i18n/pickLocalized";

type Props = {
    vm: PetProjectCardVM;
    locale: string;
};

export function ProjectCard({vm, locale}: Props) {
    const router = useRouter();

    const title = pickLocalized(vm.data.titles, locale);
    const subtitle = pickLocalized(vm.data.subtitles, locale);

    const href = `/pet-project/${encodeURIComponent(vm.data.id)}`;

    const prefetch = useCallback(() => {
        router.prefetch(href);
    }, [href, router]);

    return (
        <Link
            href={href}
            prefetch={false}
            onMouseEnter={prefetch}
            onTouchStart={prefetch}
            aria-label={title || "Pet project"}
            className={cn(
                "group block",
                "rounded-[28px] aspect-357/300 m:aspect-357/340 xxl:aspect-357/240",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            )}
            style={{backgroundColor: vm.data.accentColor}}
        >
            <div className="relative w-full h-full" style={{transform: "translateZ(0)"}}>
                {vm.imageUrl ? (
                    <Image
                        src={vm.imageUrl}
                        alt={title || "Project preview"}
                        fill
                        className="block object-cover rounded-[28px]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onLoadingComplete={(img) => {
                            setPetProjectThumb(vm.data.id, img.currentSrc);
                        }}
                    />
                ) : null}

                <div className="pointer-events-none absolute inset-0 bg-black/10 rounded-[28px]"/>
                <div
                    className="pointer-events-none absolute -inset-[0.5px] rounded-[28px] bg-linear-to-t from-black/90 via-black/60 to-transparent"/>

                <div className="absolute inset-x-0 bottom-0 p-5 m:p-6">
                    <div className="text-left text-lg font-semibold text-on-surface drop-shadow">
                        {title}
                    </div>

                    {subtitle ? (
                        <div className="mt-2 text-left text-sm text-on-surface/90 line-clamp-4 drop-shadow">
                            {subtitle}
                        </div>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}