import {cn} from "@/lib/cn";

export function PetProjectDemo({title, url}: { title: string; url: string }) {
    return (
        <section>
            <h2 className="text-lg font-semibold">{title}</h2>

            <div className="mt-4">
                <div
                    className={cn(
                        "w-full overflow-hidden rounded-toolbar",
                        "border border-white/10",
                    )}
                    style={{
                        height: "clamp(260px, 60vh, 720px)",
                        background: "rgba(0,0,0,0.35)",
                    }}
                >
                    <video
                        className="h-full w-full"
                        style={{objectFit: "contain", background: "transparent"}}
                        controls
                        playsInline
                        preload="metadata"
                        src={url}
                    />
                </div>
            </div>
        </section>
    );
}