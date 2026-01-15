import {cn} from "@/lib/cn";
import {AppChip} from "@/components/ui/AppChip";

export function WelcomeChips({
                                 chips,
                                 justify,
                             }: {
    chips: string[];
    justify: "center" | "end";
}) {
    return (
        <div
            className={cn(
                "flex flex-wrap gap-[var(--gap-lg)]",
                justify === "center" ? "justify-center" : "justify-end",
            )}
        >
            {chips.map((c) => (
                <AppChip key={c} text={c}/>
            ))}
        </div>
    );
}