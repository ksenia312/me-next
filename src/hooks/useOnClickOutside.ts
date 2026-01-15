"use client";

import {useEffect} from "react";

export function useOnClickOutside(
    active: boolean,
    refs: Array<React.RefObject<HTMLElement | null>>,
    onOutside: () => void,
) {
    useEffect(() => {
        if (!active) return;

        const onDown = (e: MouseEvent) => {
            const target = e.target as Node | null;
            if (!target) return;

            const clickedInside = refs.some((r) => r.current?.contains(target));
            if (clickedInside) return;

            onOutside();
        };

        window.addEventListener("mousedown", onDown);
        return () => window.removeEventListener("mousedown", onDown);
    }, [active, onOutside, refs]);
}