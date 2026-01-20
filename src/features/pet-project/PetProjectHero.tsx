"use client";

import Image from "next/image";
import {useState} from "react";

import {cn} from "@/lib/cn";

export function PetProjectHero({
                                   background,
                                   coverImageUrl,
                                   showErrorIcon,
                               }: {
    id: string;
    background: string;
    coverImageUrl: string | null;
    showErrorIcon: boolean;
}) {
    const [mainReady, setMainReady] = useState(false);

    return (
        <section className="w-full pt-15 m:pt-12.5" style={{background}}>
            <div className="h-64.5 w-full flex items-center justify-center">
                {showErrorIcon ? (
                    <Image
                        src="/icons/ic_error.svg"
                        alt=""
                        width={52}
                        height={52}
                        style={{opacity: 0.9}}
                    />
                ) : coverImageUrl ? (
                    <div className="relative h-full w-full">
                        <Image
                            src={coverImageUrl}
                            alt=""
                            fill
                            sizes="100vw"
                            priority
                            className={cn(
                                "object-contain",
                                "transition-opacity duration-300",
                                mainReady ? "opacity-100" : "opacity-0",
                            )}
                            onLoadingComplete={() => setMainReady(true)}
                        />
                        {!mainReady ? (
                            <div
                                className="absolute inset-0"
                                style={{backgroundColor: "rgba(0,0,0,0.15)"}}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
}