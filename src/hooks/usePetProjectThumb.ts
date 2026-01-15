"use client";

import {useEffect, useState} from "react";

export function usePetProjectThumb(id: string) {
    const [thumbSrc, setThumbSrc] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        import("@/lib/shared/client/petProjectThumbCache").then(({getPetProjectThumb}) => {
            if (!alive) return;
            setThumbSrc(getPetProjectThumb(id));
        });

        return () => {
            alive = false;
        };
    }, [id]);

    return thumbSrc;
}