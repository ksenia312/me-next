"use client";

import {useMemo} from "react";
import {useTranslation} from "react-i18next";

import {sectionTabs} from "@/lib/navigation/sectionTabs";
import {FooterNav} from "@/components/layout/footer/FooterNav";
import {SocialLinks} from "@/components/layout/footer/SocialLinks";

type FooterProps = {
    background?: string;
};

export function Footer({background}: FooterProps) {
    const {t} = useTranslation();

    const navItems = useMemo(
        () => sectionTabs.map((x) => ({id: x.id, label: t(x.i18nKey)})),
        [t],
    );

    return (
        <footer style={{background: background ?? "var(--color-surface)"}}>
            <div className="mx-auto px-(--lm) py-4 m:py-0">
                <FooterNav items={navItems}/>
            </div>

            <div className="h-2 m:h-8"/>

            <SocialLinks/>

            <div className="h-4"/>

            <div className="px-(--lm) py-8">
                <div
                    className="mx-auto flex flex-col items-center justify-center gap-4 text-sm text-on-surface/80 m:flex-row m:gap-8">
                    <span>© 2026 xenikii</span>

                    <a
                        href="mailto:nikitina3619@gmail.com"
                        className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50 transition"
                    >
                        nikitina3619@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
}