import {type ReactNode, useId} from "react";

import {cn} from "@/lib/cn";

type Props = {
    children: ReactNode;
    className?: string;
    overlapPx?: number;
    waveHeightPx?: number;
    wideFromPx?: number;
    normalMode?: "slice" | "meet";
    wideMode?: "none" | "slice" | "meet";
    align?: "top" | "center";
};

function preserve(align: "top" | "center", mode: "none" | "slice" | "meet") {
    if (mode === "none") return "none";
    return align === "top"
        ? (`xMidYMin ${mode}` as const)
        : (`xMidYMid ${mode}` as const);
}

export function WaveSection({
                                children,
                                className,
                                overlapPx = 110,
                                waveHeightPx = 150,
                                wideFromPx = 1920,
                                normalMode = "slice",
                                wideMode = "none",
                                align = "top",
                            }: Props) {
    const uid = useId().replaceAll(":", "");
    const normalClass = `wave-normal-${uid}`;
    const wideClass = `wave-wide-${uid}`;

    const y11 = -10;
    const y12 = 350;
    const y21 = 0;
    const y22 = 500;

    const maxValue = 300;
    const clipped = Math.max(0, waveHeightPx - 10);
    const f = clipped / maxValue;

    const p1y = y11 * f;
    const p2y = y12 * f;
    const p3y = 150 * f;

    const p4y = y21 * f;
    const p5y = y22 * f;
    const p6y = 0;

    const vbW = 1440;
    const vbH = 220;

    const wavePath = `
    M 0 0
    C ${vbW * 0.15} ${p1y}, ${vbW * 0.3} ${p2y}, ${vbW * 0.5} ${p3y}
    C ${vbW * 0.65} ${p4y}, ${vbW * 0.8} ${p5y}, ${vbW} ${p6y}
  `;

    const normalPreserve = preserve(align, normalMode);
    const widePreserve = preserve(align, wideMode);

    const showWideCss = `
    .${wideClass}{display:none}
    @media (min-width:${wideFromPx}px){
      .${normalClass}{display:none}
      .${wideClass}{display:block}
    }
  `.trim();

    return (
        <section
            className={cn("relative w-full", className)}
            style={{
                marginTop: `-${overlapPx}px`,
                paddingTop: `${overlapPx}px`,
            }}
        >
            <style>{showWideCss}</style>

            <div
                className="absolute inset-x-0 top-0 w-full overflow-hidden leading-none"
                style={{height: `${waveHeightPx}px`}}
                aria-hidden="true"
            >
                <svg
                    className={cn("absolute inset-0 h-full w-full", normalClass)}
                    viewBox={`0 0 ${vbW} ${vbH}`}
                    preserveAspectRatio={normalPreserve}
                >
                    <path
                        d={`
              ${wavePath}
              L ${vbW} ${vbH}
              L 0 ${vbH}
              Z
            `}
                        fill="var(--color-surface)"
                    />
                    <path
                        d={wavePath}
                        fill="none"
                        stroke="var(--color-wave-border)"
                        strokeWidth="2"
                        strokeOpacity="0.55"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>

                <svg
                    className={cn("absolute inset-0 h-full w-full", wideClass)}
                    viewBox={`0 0 ${vbW} ${vbH}`}
                    preserveAspectRatio={widePreserve}
                >
                    <path
                        d={`
              ${wavePath}
              L ${vbW} ${vbH}
              L 0 ${vbH}
              Z
            `}
                        fill="var(--color-surface)"
                    />
                    <path
                        d={wavePath}
                        fill="none"
                        stroke="var(--color-wave-border)"
                        strokeWidth="2"
                        strokeOpacity="0.55"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className="relative">{children}</div>
        </section>
    );
}