import {Spinner} from "@/components/ui/Spinner";
import {AppMarkdown} from "@/components/ui/AppMarkdown";


export function PetProjectReadmeCard({
                                         title,
                                         status,
                                         markdown,
                                         sourceUrl,
                                     }: {
    title: string;
    status: "idle" | "loading" | "ready" | "error";
    markdown: string | null;
    sourceUrl?: string | null;
}) {
    return (
        <div className="overflow-hidden rounded-toolbar bg-(--color-markdown-bg)">
            <div className="px-6 py-4 bg-(--color-markdown-bg) border-b border-white/10">
                <div className="text-sm font-medium">{title}</div>
            </div>

            <div className="p-6">
                {status === "loading" ? (
                    <div className="flex items-center gap-2 text-on-surface/70">
                        <Spinner size={16}/>
                    </div>
                ) : status === "error" ? (
                    <div className="text-on-surface/70">Failed to load README.</div>
                ) : markdown ? (
                    <AppMarkdown markdown={markdown} sourceUrl={sourceUrl}/>
                ) : (
                    <div className="text-on-surface/70">No README.</div>
                )}
            </div>
        </div>
    );
}