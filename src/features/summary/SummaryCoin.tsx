"use client";

import React, {useId, useState} from "react";

import {cn} from "@/lib/cn";

type Props = {
    title: string;
    subtitle: string;
    back: React.ReactNode;
};

function MobileCard({
                        flipped,
                        contentId,
                        title,
                        subtitle,
                        back,
                    }: {
    flipped: boolean;
    contentId: string;
    title: string;
    subtitle: string;
    back: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "w-full rounded-2xl",
                "bg-summary-bg",
                "border border-wave-border/25",
                "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                "p-6 text-center",
            )}
        >
            {flipped ? (
                <div id={contentId} className="text-on-surface/90 text-sm leading-relaxed">
                    {back}
                </div>
            ) : (
                <div>
                    <div className="text-on-surface text-2xl font-medium leading-none">
                        {title}
                    </div>
                    <div className="mt-3 text-on-surface/80 text-sm leading-snug">
                        {subtitle}
                    </div>
                </div>
            )}
        </div>
    );
}

function DesktopCoin({
                         flipped,
                         contentId,
                         title,
                         subtitle,
                         back,
                     }: {
    flipped: boolean;
    contentId: string;
    title: string;
    subtitle: string;
    back: React.ReactNode;
}) {
    return (
        <div className="relative mx-auto aspect-square w-60 m:w-55 l:w-70 cursor-pointer">
            <div className="absolute inset-0 perspective-[1000px]">
                <div
                    className={cn(
                        "absolute inset-0 transition-transform duration-500",
                        "transform-3d",
                        "ease-[cubic-bezier(0.2,0.9,0.2,1.15)]",
                        flipped ? "transform-[rotateY(180deg)]" : "transform-[rotateY(0deg)]",
                    )}
                >
                    <div
                        className={cn(
                            "absolute inset-0 rounded-full",
                            "bg-summary-bg",
                            "border border-wave-border/25",
                            "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                            "grid place-items-center p-6 text-center",
                            "backface-hidden",
                            "transition-transform duration-300 group-hover:transform-[scale(1.04)]",
                        )}
                    >
                        <div>
                            <div className="text-on-surface text-2xl font-medium leading-none">
                                {title}
                            </div>
                            <div className="mt-3 text-on-surface/80 text-sm leading-snug">
                                {subtitle}
                            </div>
                        </div>
                    </div>

                    <div
                        id={contentId}
                        className={cn(
                            "absolute inset-0 rounded-full",
                            "bg-[var(--color-section)]",
                            "border border-wave-border/22",
                            "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                            "grid place-items-center p-6 text-center",
                            "backface-hidden",
                            "transform-[rotateY(180deg)]",
                        )}
                    >
                        <div className="text-on-surface/90 text-sm leading-relaxed">
                            {back}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryCoin({title, subtitle, back}: Props) {
    const [flipped, setFlipped] = useState(false);
    const contentId = useId();

    return (
        <button
            type="button"
            aria-pressed={flipped}
            aria-controls={contentId}
            onClick={() => setFlipped((v) => !v)}
            className="group block w-full outline-none"
        >
            <div className="relative mx-auto w-full max-w-105 s:max-w-none">
                <div className="s:hidden">
                    <MobileCard
                        flipped={flipped}
                        contentId={contentId}
                        title={title}
                        subtitle={subtitle}
                        back={back}
                    />
                </div>

                <div className="hidden s:block">
                    <DesktopCoin
                        flipped={flipped}
                        contentId={contentId}
                        title={title}
                        subtitle={subtitle}
                        back={back}
                    />
                </div>
            </div>
        </button>
    );
}

export default SummaryCoin;