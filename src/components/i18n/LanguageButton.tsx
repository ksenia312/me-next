"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import {supportedLanguages, type SupportedLocale} from "@/i18n/i18n";
import {localePrettyName} from "@/i18n/localeNames";
import {useBodyScrollLock} from "@/hooks/useBodyScrollLock";
import {useEscapeKey} from "@/hooks/useEscapeKey";
import {useOnClickOutside} from "@/hooks/useOnClickOutside";
import {cn} from "@/lib/cn";
import {readStoredLocale, writeStoredLocale} from "@/i18n/localeStorage";
import {createPortal} from "react-dom";

type Props = {
    fullWidth?: boolean;
    center?: boolean;
    className?: string;
};

export function LanguageButton({
                                   fullWidth = false,
                                   center = false,
                                   className,
                               }: Props) {
    const {i18n} = useTranslation();

    const [openDesktop, setOpenDesktop] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useBodyScrollLock(openMobile);
    useEscapeKey(openDesktop || openMobile, () => {
        setOpenDesktop(false);
        setOpenMobile(false);
    });

    useOnClickOutside(openDesktop, [triggerRef, menuRef], () => setOpenDesktop(false));

    const current = useMemo<SupportedLocale>(() => {
        const stored = readStoredLocale();
        const lng = (stored ?? i18n.language ?? "en") as SupportedLocale;
        return supportedLanguages.includes(lng) ? lng : ("en" as SupportedLocale);
    }, [i18n.language]);

    const setLocale = async (lng: SupportedLocale) => {
        await i18n.changeLanguage(lng);
        writeStoredLocale(lng);
    };

    const headerTabClass =
        "rounded-toolbar px-6 py-2 text-sm text-on-surface/90 hover:bg-secondary/60 hover:text-on-surface transition cursor-pointer";

    const triggerClassName = cn(
        headerTabClass,
        fullWidth && "w-full",
        center && "text-center",
        className,
    );

    return (
        <>
            {/* Desktop */}
            <div className="relative hidden m:block">
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={() => setOpenDesktop((v) => !v)}
                    className={triggerClassName}
                    aria-haspopup="menu"
                    aria-expanded={openDesktop}
                >
                    {current.toUpperCase()}
                </button>

                {openDesktop ? (
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-55 overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                        style={{backgroundColor: "var(--color-tertiary)"}}
                        role="menu"
                    >
                        <div className="max-h-80 overflow-auto">
                            {supportedLanguages.map((lng) => {
                                const active = lng === current;

                                return (
                                    <button
                                        key={lng}
                                        type="button"
                                        onClick={async () => {
                                            await setLocale(lng);
                                            setOpenDesktop(false);
                                        }}
                                        className={cn(
                                            "w-full px-3 py-2 text-left text-sm transition cursor-pointer",
                                            active
                                                ? "bg-primary-hover text-on-surface"
                                                : "text-on-surface/90 hover:bg-primary/10",
                                        )}
                                        role="menuitem"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span>{localePrettyName(lng)}</span>
                                            <span className="text-on-surface/60">{lng.toUpperCase()}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Mobile */}
            <div className="m:hidden">
                <button
                    type="button"
                    onClick={() => setOpenMobile(true)}
                    className={cn(
                        headerTabClass,
                        fullWidth && "w-full",
                        center && "text-center",
                        className,
                    )}
                >
                    {localePrettyName(current)}
                </button>

                {openMobile ? (
                    <Portal>
                        <div className="fixed inset-0 z-99999 m:hidden">
                            {/* overlay */}
                            <div
                                className="absolute inset-0 bg-black/40"
                                onClick={() => setOpenMobile(false)}
                                aria-hidden="true"
                            />

                            {/* sheet */}
                            <div
                                className="absolute inset-0"
                                style={{backgroundColor: "var(--color-surface)"}}
                            >
                                <div className="flex h-15 items-center justify-between px-4">
                                    <div className="text-on-surface/90 text-sm"/>
                                    <button
                                        type="button"
                                        onClick={() => setOpenMobile(false)}
                                        className="grid h-10 w-10 place-items-center rounded-lg hover:bg-secondary/60 transition text-on-surface cursor-pointer"
                                        aria-label="Close"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M6 6l12 12M18 6L6 18"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="overflow-y-auto" style={{height: "calc(100vh - 60px)"}}>
                                    <div className="mx-auto w-full max-w-130 px-4 pt-6">
                                        <div className="space-y-3">
                                            {supportedLanguages.map((lng) => {
                                                const active = lng === current;

                                                return (
                                                    <button
                                                        key={lng}
                                                        type="button"
                                                        onClick={async () => {
                                                            await setLocale(lng);
                                                            setOpenMobile(false);
                                                        }}
                                                        className={cn(
                                                            "w-full rounded-lg px-4 py-4 text-center text-base transition cursor-pointer text-on-surface",
                                                            active
                                                                ? "bg-(--color-tertiary)"
                                                                : "bg-(--color-secondary) hover:bg-(--color-tertiary)",
                                                        )}
                                                    >
                                                        {localePrettyName(lng)}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Portal>
                ) : null}
            </div>
        </>
    );
}


export function Portal({children}: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return createPortal(children, document.body);
}