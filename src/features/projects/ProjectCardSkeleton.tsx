import {cn} from "@/lib/cn";

export function ProjectCardSkeleton({
                                        className,
                                    }: {
    className?: string;
}) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "rounded-[28px] aspect-357/300 m:aspect-357/340 xxl:aspect-357/240",
                "border border-white/10 bg-white/5",
                "animate-pulse",
                className,
            )}
        />
    );
}