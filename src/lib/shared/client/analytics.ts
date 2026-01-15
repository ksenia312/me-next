"use client";

import type {Analytics} from "firebase/analytics";

import {getFirebaseApp} from "@/lib/shared/client/firebase";

export async function initAnalytics(): Promise<Analytics | null> {
    if (typeof window === "undefined") return null;

    const mod = await import("firebase/analytics");
    if (!(await mod.isSupported())) return null;

    return mod.getAnalytics(getFirebaseApp());
}