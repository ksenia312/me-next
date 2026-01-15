import type {ReactNode} from "react";

export function ExperienceCard({children}: { children: ReactNode }) {
    return (
        <div className="rounded-2xl p-6 shadow-[0_10px_20px_rgba(0,0,0,0.35)] bg-(--color-section)">
            {children}
        </div>
    );
}