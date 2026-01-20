"use client";

import type {ReactNode} from "react";

import {PetProjectsProvider} from "@/lib/features/projects/context";

export function Providers({
                              children,
                          }: {
    children: ReactNode;
}) {
    return <PetProjectsProvider>{children}</PetProjectsProvider>;
}