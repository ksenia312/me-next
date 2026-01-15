"use client";

import Image from "next/image";
import {useState} from "react";

import {usePetProjectThumb} from "@/hooks/usePetProjectThumb";
import {cn} from "@/lib/cn";

export function PetProjectHero({
                                   id,
                                   background,
                                   coverImageUrl,
                                   showErrorIcon,
                               }: {
    id: string;
    background: string;
    coverImageUrl: string | null;
    showErrorIcon: boolean;
}) {
    const thumbSrc = usePetProjectThumb(id);
    const [mainReady, setMainReady] = useState(false);

    return (
        <section className="w-full pt-[60px] m:pt-[50px]" style={{background}}>
            <div className="h-[258px] w-full flex items-center justify-center">
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
                        {thumbSrc && !mainReady ? (
                            <img
                                src={thumbSrc}
                                alt=""
                                className="absolute inset-0 h-full w-full object-contain blur-2xl scale-[1.02] opacity-80"
                            />
                        ) : null}

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
                    </div>
                ) : null}
            </div>
        </section>
    );
}