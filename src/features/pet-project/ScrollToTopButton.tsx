"use client";

import {useScrolled} from "@/hooks/useScrolled";

export function ScrollToTopButton() {
    const show = useScrolled(600);

    if (!show) return null;

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-secondary hover:bg-tertiary transition border border-white/10"
        >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 5l-7 7m7-7l7 7M12 5v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}