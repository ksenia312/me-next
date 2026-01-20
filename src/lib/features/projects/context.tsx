"use client";

import {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState,} from "react";

import {fetchPetProjectCards} from "@/lib/features/projects/client";
import type {PetProjectCardsResult} from "@/lib/features/projects/types";

type Status = "idle" | "loading" | "ready" | "error";

type PetProjectsContextValue = {
    data: PetProjectCardsResult | null;
    status: Status;
    error: string | null;
    refresh: () => Promise<void>;
};

const PetProjectsContext = createContext<PetProjectsContextValue | null>(null);

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "dev";
const SESSION_KEY = `petProjects.cards.v2.${APP_VERSION}`;

function readSession(): PetProjectCardsResult | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as PetProjectCardsResult;
    } catch {
        return null;
    }
}

function writeSession(value: PetProjectCardsResult) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
}

export function PetProjectsProvider({children}: { children: ReactNode }) {
    const [data, setData] = useState<PetProjectCardsResult | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    const inFlightRef = useRef<Promise<void> | null>(null);

    const load = useCallback(async () => {
        if (inFlightRef.current) return inFlightRef.current;

        const p = (async () => {
            setStatus((s) => (s === "ready" ? "ready" : "loading"));
            setError(null);

            try {
                if (!data) {
                    const cached = readSession();
                    if (cached) {
                        setData(cached);
                        setStatus("ready");
                        return;
                    }
                }

                const res = await fetchPetProjectCards();
                setData(res);
                setStatus("ready");
                writeSession(res);
            } catch (e) {
                setStatus("error");
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                inFlightRef.current = null;
            }
        })();

        inFlightRef.current = p;
        return p;
    }, [data]);

    const refresh = useCallback(async () => {
        sessionStorage.removeItem(SESSION_KEY);
        inFlightRef.current = null;
        setStatus("loading");
        await load();
    }, [load]);

    useEffect(() => {
        if (!data) {
            void load();
        }
    }, [data, load]);

    const value = useMemo<PetProjectsContextValue>(
        () => ({data, status, error, refresh}),
        [data, status, error, refresh],
    );

    return (
        <PetProjectsContext.Provider value={value}>
            {children}
        </PetProjectsContext.Provider>
    );
}

export function usePetProjects(): PetProjectsContextValue {
    const ctx = useContext(PetProjectsContext);
    if (!ctx) throw new Error("usePetProjects must be used within PetProjectsProvider");
    return ctx;
}