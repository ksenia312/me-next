import {cn} from "@/lib/cn";

export function AppChip({text, className}: { text: string; className?: string }) {
    return (
        <div
            className={cn(
                "inline-flex items-center justify-center",
                "rounded-full",
                "px-4 py-3",
                "text-[14px] leading-none",
                "text-on-surface",
                "border border-wave-border/22",
                "bg-chip",
                className,
            )}
        >
            {text}
        </div>
    );
}