import {cn} from "@/lib/cn";

type Props = {
    title: string;
    subtitle: string;
    align?: "left" | "right";
};

export function AppTitle({title, subtitle, align = "right"}: Props) {
    const rootAlign = align === "left" ? "items-start" : "items-end";
    const textAlign = align === "left" ? "text-left" : "text-right";

    return (
        <div className={cn("flex flex-col max-md:items-center", rootAlign)}>
            <div
                className={cn(
                    "font-bold uppercase",
                    "text-[28px] leading-[1.2] max-md:text-[28px]",
                    "max-md:text-center",
                    "tracking-[0.08em]",
                    textAlign,
                )}
            >
                {title}
            </div>

            <div
                className={cn(
                    "mt-2 text-lg text-on-surface/80",
                    "max-md:text-center",
                    textAlign,
                )}
            >
                {subtitle}
            </div>
        </div>
    );
}