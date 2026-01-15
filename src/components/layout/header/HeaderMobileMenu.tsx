"use client";

import {useEffect} from "react";

import type {HeaderItem} from "@/components/layout/header/HeaderNav";
import {scrollToId} from "@/lib/dom/scrollToId";
import {HeaderIconButton} from "@/components/layout/header/HeaderIconButton";
import {CloseIcon} from "@/components/layout/header/icons";
import {LanguageButton} from "@/components/i18n/LanguageButton";

function HeaderMobileMenu({
                              open,
                              items,
                              onClose,
                          }: {
    open: boolean;
    items: HeaderItem[];
    onClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose, open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-9999 m:hidden">
            <div
                className="absolute inset-0"
                style={{
                    background: "var(--color-surface)",
                }}
            />

            <div className="relative h-full">
                <div className="flex h-15 items-center justify-end px-4">
                    <HeaderIconButton label="Close menu" onClick={onClose}>
                        <CloseIcon/>
                    </HeaderIconButton>
                </div>

                <div className="px-4 pt-6">
                    <div className="mx-auto w-full max-w-130 space-y-4">
                        {items.map((it) => (
                            <a
                                key={it.id}
                                href={`#${it.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    requestAnimationFrame(() => {
                                        scrollToId(it.id, {behavior: "smooth", updateHash: true});
                                    });
                                }}
                                className={[
                                    "block w-full rounded-lg px-4 py-4 text-center text-base",
                                    "bg-(--color-secondary) text-on-surface",
                                    "hover:bg-(--color-tertiary) active:bg-(--color-tertiary-hover)",
                                    "transition",
                                ].join(" ")}
                            >
                                {it.label}
                            </a>
                        ))}
                    </div>

                    <div className="fixed inset-x-0 bottom-0 z-10000 px-4 pb-6">
                        <div className="mx-auto w-full max-w-130">
                            <LanguageButton fullWidth center className="py-4"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderMobileMenu