"use client";

import {scrollToId} from "@/lib/dom/scrollToId";

export type HeaderItem = {
    id: string;
    label: string;
};

export function HeaderNav({items}: { items: HeaderItem[] }) {
    return (
        <nav className="hidden m:flex items-center gap-2">
            {items.map((it) => (
                <a
                    key={it.id}
                    href={`#${it.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToId(it.id, {behavior: "smooth", updateHash: true});
                    }}
                    className="rounded-toolbar px-6 py-2 text-sm text-on-surface/90 hover:bg-secondary/60 hover:text-on-surface transition"
                >
                    {it.label}
                </a>
            ))}
        </nav>
    );
}