type RailProps = {
    accent: string;
    railArea: number;
    stroke: number;
    left: number;
    className: string;
};

function Rail({accent, railArea, stroke, left, className}: RailProps) {
    return (
        <div
            className={`${className} pointer-events-none absolute top-0 bottom-0 z-0`}
            style={{left}}
        >
            <div className="relative h-full" style={{width: railArea}}>
                <div
                    className="absolute left-1/2 top-0 -translate-x-1/2"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: `${railArea / 2}px solid transparent`,
                        borderRight: `${railArea / 2}px solid transparent`,
                        borderBottom: `${railArea}px solid ${accent}`,
                    }}
                />

                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: railArea,
                        bottom: railArea,
                        width: stroke,
                        backgroundColor: accent,
                    }}
                />

                <div
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full"
                    style={{
                        width: railArea,
                        height: railArea,
                        backgroundColor: accent,
                    }}
                />
            </div>
        </div>
    );
}

export function TimelineRail() {
    const accent = "var(--color-accent-more)";

    const circleSize = 78;
    const railArea = 15;
    const stroke = 1;

    const leftColumnWidth = 260;
    const centerXDesktop = leftColumnWidth - circleSize / 2;
    const leftDesktop = centerXDesktop - railArea / 2;

    const centerXMobile = circleSize / 2;
    const leftMobile = centerXMobile - railArea / 2;

    return (
        <>
            <Rail
                accent={accent}
                railArea={railArea}
                stroke={stroke}
                left={leftMobile}
                className="m:hidden"
            />
            <Rail
                accent={accent}
                railArea={railArea}
                stroke={stroke}
                left={leftDesktop}
                className="hidden m:block"
            />
        </>
    );
}