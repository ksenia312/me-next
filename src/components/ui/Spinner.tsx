"use client";

import {cn} from "@/lib/cn";

export function Spinner({
                            size = 18,
                            className,
                        }: {
    size?: number;
    className?: string;
}) {
    return (
        <span
            role="status"
            className={cn("inline-block animate-spin rounded-full", className)}
            style={{
                width: size,
                height: size,
                border: "2px solid color-mix(in srgb, var(--color-on-surface) 25%, transparent)",
                borderTopColor:
                    "color-mix(in srgb, var(--color-on-surface) 85%, transparent)",
            }}
        />
    );
}