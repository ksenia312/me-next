"use client";

import {useMemo} from "react";
import {useTranslation} from "react-i18next";

export type ExperienceOrder = "first" | "middle" | "last";

export type ExperienceItem = {
    id: string;
    order: ExperienceOrder;
    title: string;
    organization: string;
    location: string;
    duration: string;
    subtitle: string;
    skills: string[];
    achievements: string[];
    imageSrc: string;
};

export function useExperienceItems(): ExperienceItem[] {
    const {t, i18n} = useTranslation();

    return useMemo(() => {
        const items: ExperienceItem[] = [
            {
                id: "q42",
                order: "first",
                title: t("experience.q42.title"),
                organization: t("experience.q42.organization"),
                location: t("experience.q42.location"),
                duration: t("experience.q42.duration"),
                subtitle: t("experience.q42.subtitle"),
                skills: [
                    t("experience.q42.skills.skill1"),
                    t("experience.q42.skills.skill2"),
                    t("experience.q42.skills.skill3"),
                    t("experience.q42.skills.skill4"),
                    t("experience.q42.skills.skill5"),
                    t("experience.q42.skills.skill6"),
                ],
                achievements: [],
                imageSrc: "/images/q42-image.svg",
            },
            {
                id: "greenflux",
                order: "middle",
                title: t("experience.greenflux.title"),
                organization: t("experience.greenflux.organization"),
                location: t("experience.greenflux.location"),
                duration: t("experience.greenflux.duration"),
                subtitle: t("experience.greenflux.subtitle"),
                skills: [
                    t("experience.greenflux.skills.skill1"),
                    t("experience.greenflux.skills.skill2"),
                    t("experience.greenflux.skills.skill3"),
                    t("experience.greenflux.skills.skill4"),
                    t("experience.greenflux.skills.skill5"),
                    t("experience.greenflux.skills.skill6"),
                    t("experience.greenflux.skills.skill7"),
                    t("experience.greenflux.skills.skill8"),
                    t("experience.greenflux.skills.skill9"),
                    t("experience.greenflux.skills.skill10"),
                    t("experience.greenflux.skills.skill11"),
                    t("experience.greenflux.skills.skill12"),
                    t("experience.greenflux.skills.skill13"),
                ],
                achievements: [
                    t("experience.greenflux.achievements.achievement1"),
                    t("experience.greenflux.achievements.achievement2"),
                    t("experience.greenflux.achievements.achievement3"),
                    t("experience.greenflux.achievements.achievement4"),
                    t("experience.greenflux.achievements.achievement5"),
                    t("experience.greenflux.achievements.achievement6"),
                    t("experience.greenflux.achievements.achievement7"),
                    t("experience.greenflux.achievements.achievement8"),
                ],
                imageSrc: "/images/greenflux-image.svg",
            },
            {
                id: "friflex",
                order: "middle",
                title: t("experience.friflex.title"),
                organization: t("experience.friflex.organization"),
                location: t("experience.friflex.location"),
                duration: t("experience.friflex.duration"),
                subtitle: t("experience.friflex.subtitle"),
                skills: [
                    t("experience.friflex.skills.skill1"),
                    t("experience.friflex.skills.skill2"),
                    t("experience.friflex.skills.skill3"),
                    t("experience.friflex.skills.skill4"),
                    t("experience.friflex.skills.skill5"),
                    t("experience.friflex.skills.skill6"),
                    t("experience.friflex.skills.skill7"),
                    t("experience.friflex.skills.skill8"),
                    t("experience.friflex.skills.skill9"),
                    t("experience.friflex.skills.skill10"),
                    t("experience.friflex.skills.skill11"),
                    t("experience.friflex.skills.skill12"),
                    t("experience.friflex.skills.skill13"),
                    t("experience.friflex.skills.skill14"),
                ],
                achievements: [
                    t("experience.friflex.achievements.achievement1"),
                    t("experience.friflex.achievements.achievement2"),
                    t("experience.friflex.achievements.achievement3"),
                    t("experience.friflex.achievements.achievement4"),
                    t("experience.friflex.achievements.achievement5"),
                    t("experience.friflex.achievements.achievement6"),
                    t("experience.friflex.achievements.achievement7"),
                    t("experience.friflex.achievements.achievement8"),
                ],
                imageSrc: "/images/friflex-image.svg",
            },
            {
                id: "agroStab",
                order: "last",
                title: t("experience.agroStab.title"),
                organization: t("experience.agroStab.organization"),
                location: t("experience.agroStab.location"),
                duration: t("experience.agroStab.duration"),
                subtitle: t("experience.agroStab.subtitle"),
                skills: [
                    t("experience.agroStab.skills.skill1"),
                    t("experience.agroStab.skills.skill2"),
                    t("experience.agroStab.skills.skill3"),
                    t("experience.agroStab.skills.skill4"),
                    t("experience.agroStab.skills.skill5"),
                    t("experience.agroStab.skills.skill6"),
                    t("experience.agroStab.skills.skill7"),
                    t("experience.agroStab.skills.skill8"),
                ],
                achievements: [
                    t("experience.agroStab.achievements.achievement1"),
                    t("experience.agroStab.achievements.achievement2"),
                    t("experience.agroStab.achievements.achievement3"),
                    t("experience.agroStab.achievements.achievement4"),
                    t("experience.agroStab.achievements.achievement5"),
                    t("experience.agroStab.achievements.achievement6"),
                    t("experience.agroStab.achievements.achievement7"),
                    t("experience.agroStab.achievements.achievement8"),
                ],
                imageSrc: "/images/agro-stab-image.svg",
            },
        ];

        return items;
    }, [t, i18n.language]);
}