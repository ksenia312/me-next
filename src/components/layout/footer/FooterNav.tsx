"use client";

import {scrollToId} from "@/lib/dom/scrollToId";

export function FooterNav({
                              items,
                          }: {
    items: Array<{ id: string; label: string }>;
}) {
    return (
        <div className="mx-auto flex flex-col items-stretch gap-2 m:flex-row m:w-max m:items-center m:justify-center">
            {items.map((it) => (
                <a
                    key={it.id}
                    href={`/#${it.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToId(it.id, {
                            behavior: "smooth",
                            updateHash: true,
                            fallbackToRoot: true,
                        });
                    }}
                    className={[
                        "w-full m:w-auto",
                        "rounded-toolbar px-6 py-3 text-sm",
                        "text-on-surface/90",
                        "hover:bg-secondary/60 hover:text-on-surface",
                        "transition",
                    ].join(" ")}
                >
                    {it.label}
                </a>
            ))}
        </div>
    );
}