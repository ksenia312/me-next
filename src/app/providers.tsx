"use client";

import type {ReactNode} from "react";

import {PetProjectsProvider} from "@/lib/features/projects/context";
import type {PetProjectCardsResult} from "@/lib/features/projects/types";

export function Providers({
                              children,
                              initialPetProjects,
                          }: {
    children: ReactNode;
    initialPetProjects?: PetProjectCardsResult | null;
}) {
    return (
        <PetProjectsProvider initialData={initialPetProjects}>
            {children}
        </PetProjectsProvider>
    );
}