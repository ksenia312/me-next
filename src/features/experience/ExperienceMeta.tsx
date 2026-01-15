import Image from "next/image";

import type {ExperienceItem} from "@/hooks/useExperienceItems";

const ACCENT = "var(--color-accent-more)";
const CIRCLE_SIZE = 78;
const DATE_LINE_HEIGHT = 20;

export function ExperienceMetaBetweenCards({item}: { item: ExperienceItem }) {
    return (
        <div
            className="relative w-full text-on-surface/85"
            style={{paddingRight: CIRCLE_SIZE + 24}}
        >
            <div
                className="wrap-break-word"
                style={{
                    lineHeight: `${DATE_LINE_HEIGHT}px`,
                    display: "-webkit-box",
                    textAlign: "end",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {item.duration}
            </div>

            <div
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 overflow-hidden rounded-full border-[0.5px]"
                style={{
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    borderColor: ACCENT,
                    backgroundColor: "var(--color-gradient-extra-light)",
                }}
            >
                <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="78px"
                    priority={item.order === "first"}
                />
            </div>
        </div>
    );
}

export function ExperienceMetaMobileHeader({item}: { item: ExperienceItem }) {
    return (
        <div className="flex items-center gap-4 text-on-surface/85">
            <div
                className="relative shrink-0 overflow-hidden rounded-full border-[0.5px]"
                style={{
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    borderColor: ACCENT,
                    backgroundColor: "var(--color-gradient-extra-light)",
                }}
            >
                <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="78px"
                    priority={item.order === "first"}
                />
            </div>

            <div
                className="min-w-0 wrap-break-word text-left"
                style={{
                    lineHeight: `${DATE_LINE_HEIGHT}px`,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {item.duration}
            </div>
        </div>
    );
}