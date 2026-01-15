"use client";

import {useEffect, useState} from "react";

export function useScrolled(thresholdPx = 4) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > thresholdPx);

        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});

        return () => window.removeEventListener("scroll", onScroll);
    }, [thresholdPx]);

    return scrolled;
}