"use client";

import {useEffect, useState} from "react";

export function usePetProjectReadme({
                                        id,
                                        enabled,
                                    }: {
    id: string;
    enabled: boolean;
}) {
    const [markdown, setMarkdown] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
        "idle",
    );

    useEffect(() => {
        if (!enabled) {
            setMarkdown(null);
            setStatus("idle");
            return;
        }

        const ac = new AbortController();

        setStatus("loading");

        fetch(`/api/pet-projects/${encodeURIComponent(id)}/readme`, {
            cache: "no-store",
            signal: ac.signal,
        })
            .then(async (r) => {
                if (!r.ok) throw new Error(String(r.status));
                return (await r.json()) as { markdown: string | null };
            })
            .then((j) => {
                setMarkdown(j.markdown);
                setStatus("ready");
            })
            .catch((e) => {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setStatus("error");
            });

        return () => ac.abort();
    }, [enabled, id]);

    return {markdown, status};
}