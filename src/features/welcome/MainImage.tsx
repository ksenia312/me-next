"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {cn} from "@/lib/cn";

export function MainImage() {
    const {t} = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="w-full max-w-162.5">
            <div className="relative">
                <div
                    className={cn(
                        "transition-all duration-150 ease-in-out",
                        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    )}
                >
                    <Image
                        src="/images/me.png"
                        alt="Main"
                        width={1194}
                        height={828}
                        priority
                        className="h-auto w-full"
                    />
                </div>

                <div
                    className={cn(
                        "absolute bottom-[25%] left-0 max-md:left-0",
                        "transition-opacity duration-300 ease-in-out",
                        mounted ? "opacity-100" : "opacity-0",
                    )}
                >
                    <div className="w-[33%] md:w-[50%] text-[10px] text-on-surface/20">
                        {t("mainImageCaption")}
                    </div>
                </div>
            </div>
        </div>
    );
}