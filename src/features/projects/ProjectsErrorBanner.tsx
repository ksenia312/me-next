"use client";

type Props = {
    error: unknown;
    onRetry: () => void;
};

function formatError(error: unknown) {
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    try {
        return JSON.stringify(error);
    } catch {
        return String(error);
    }
}

export function ProjectsErrorBanner({error, onRetry}: Props) {
    return (
        <div className="mb-6 text-on-surface/70">
            <div className="mb-3">Failed to load projects: {formatError(error)}</div>
            <button className="underline" onClick={onRetry}>
                Retry
            </button>
        </div>
    );
}