"use client";

import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";

import {LanguageButton} from "@/components/i18n/LanguageButton";
import {useBodyScrollLock} from "@/hooks/useBodyScrollLock";
import {useScrolled} from "@/hooks/useScrolled";
import {sectionTabs} from "@/lib/navigation/sectionTabs";
import {BackIcon, CloseIcon, MenuIcon} from "@/components/layout/header/icons";
import {HeaderIconButton} from "@/components/layout/header/HeaderIconButton";
import {type HeaderItem, HeaderNav} from "@/components/layout/header/HeaderNav";
import HeaderMobileMenu from "@/components/layout/header/HeaderMobileMenu";

type HeaderProps = {
    variant?: "main" | "detail";
    items?: HeaderItem[];
};

export function Header({variant = "main", items}: HeaderProps) {
    const {t} = useTranslation();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const scrolled = useScrolled(4);

    useBodyScrollLock(variant === "main" && mobileOpen);

    const navItems = useMemo<HeaderItem[]>(() => {
        if (variant !== "main") return [];
        if (items) return items;

        return sectionTabs.map((x) => ({id: x.id, label: t(x.i18nKey)}));
    }, [items, t, variant]);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50">
                <div
                    className={[
                        "border-b",
                        "backdrop-blur",
                        "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200",
                        scrolled
                            ? "border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                            : "border-transparent",
                    ].join(" ")}
                    style={{
                        backgroundColor:
                            "color-mix(in srgb, var(--color-surface) 55%, transparent)",
                    }}
                >
                    <div
                        className="mx-auto flex h-15 items-center justify-between px-4 m:h-12.5"
                        style={{
                            paddingLeft: "var(--lm)",
                            paddingRight: "var(--lm)",
                        }}
                    >
                        {variant === "detail" ? (
                            <HeaderIconButton label="Back" onClick={() => router.back()}>
                                <BackIcon/>
                            </HeaderIconButton>
                        ) : (
                            <div className="w-10 m:w-auto"/>
                        )}

                        {variant === "main" ? <HeaderNav items={navItems}/> : <div/>}

                        <div className="flex items-center gap-2">
                            <div className="hidden m:block">
                                <LanguageButton/>
                            </div>

                            {variant === "main" ? (
                                <div className="m:hidden flex items-center gap-2">
                                    <LanguageButton/>
                                    <HeaderIconButton
                                        label={mobileOpen ? "Close menu" : "Open menu"}
                                        onClick={() => setMobileOpen((v) => !v)}
                                    >
                                        {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
                                    </HeaderIconButton>
                                </div>
                            ) : (
                                <div className="m:hidden">
                                    <LanguageButton/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {variant === "main" ? (
                <HeaderMobileMenu
                    open={mobileOpen}
                    items={navItems}
                    onClose={() => setMobileOpen(false)}
                />
            ) : null}
        </>
    );
}