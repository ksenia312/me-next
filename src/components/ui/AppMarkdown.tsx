"use client";

import {useTranslation} from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {isAbsoluteUrl, isBadgeLikeUrl, resolveGithubAssetUrl, toGithubBlobUrl,} from "@/lib/features/markdown/client";
import {cn} from "@/lib/cn";

type Props = {
    markdown: string;
    sourceUrl?: string | null;
};

export function AppMarkdown({markdown, sourceUrl}: Props) {
    const {t} = useTranslation();

    const imageButtonLabel = String(
        t("petProjects.markdown.imageButton", {
            defaultValue: "View image on GitHub",
        }),
    );

    return (
        <div className="text-on-surface/90">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: (props) => (
                        <h1
                            className="mt-6 mb-3 text-2xl font-semibold tracking-wide"
                            {...props}
                        />
                    ),
                    h2: (props) => (
                        <h2 className="mt-6 mb-3 text-xl font-semibold" {...props} />
                    ),
                    h3: (props) => (
                        <h3 className="mt-5 mb-2 text-lg font-semibold" {...props} />
                    ),
                    h4: (props) => (
                        <h4 className="mt-4 mb-2 text-base font-semibold" {...props} />
                    ),
                    p: (props) => (
                        <p className="my-3 leading-7 text-on-surface/85" {...props} />
                    ),
                    a: ({href, children, ...rest}) => {
                        const url = href
                            ? href.startsWith("#") || isAbsoluteUrl(href)
                                ? href
                                : resolveGithubAssetUrl(href, sourceUrl, "blob")
                            : href;

                        const external = url
                            ? isAbsoluteUrl(url) || url.startsWith("https://github.com")
                            : false;

                        return (
                            <a
                                href={url}
                                {...rest}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50 transition"
                            >
                                {children}
                            </a>
                        );
                    },
                    ul: (props) => (
                        <ul className="my-3 ml-5 list-disc space-y-1" {...props} />
                    ),
                    ol: (props) => (
                        <ol className="my-3 ml-5 list-decimal space-y-1" {...props} />
                    ),
                    li: (props) => (
                        <li className="leading-7 text-on-surface/85" {...props} />
                    ),
                    blockquote: (props) => (
                        <blockquote
                            className="my-4 border-l-2 border-white/15 pl-4 text-on-surface/75"
                            {...props}
                        />
                    ),
                    hr: () => <hr className="my-6 border-white/10"/>,
                    code: ({className, children, ...rest}) => {
                        const inline = !className;

                        if (inline) {
                            return (
                                <code
                                    className="rounded px-1.5 py-0.5 text-[0.95em] bg-white/5 border border-white/10"
                                    {...rest}
                                >
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <code className={className} {...rest}>
                                {children}
                            </code>
                        );
                    },
                    pre: (props) => (
                        <pre
                            className="my-4 overflow-x-auto rounded-toolbar bg-black/30 border border-white/10 p-4 text-sm leading-6"
                            {...props}
                        />
                    ),
                    table: ({children}) => (
                        <div className="my-4 overflow-x-auto">
                            <table className="w-full border-collapse text-sm">{children}</table>
                        </div>
                    ),
                    th: (props) => (
                        <th
                            className="border border-white/10 bg-white/5 px-3 py-2 text-left font-medium"
                            {...props}
                        />
                    ),
                    td: (props) => <td className="border border-white/10 px-3 py-2" {...props} />,
                    img: ({src = "", alt = ""}) => {
                        const srcStr = String(src);

                        const rawUrl = isAbsoluteUrl(srcStr)
                            ? srcStr
                            : resolveGithubAssetUrl(srcStr, sourceUrl, "raw");

                        const isBadge = isBadgeLikeUrl(rawUrl);

                        if (isBadge) {
                            return (
                                <img
                                    src={rawUrl}
                                    alt={alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="inline-block h-9 w-auto align-middle mr-2 mb-2 rounded-pill"
                                    style={{filter: "saturate(1.05)"}}
                                />
                            );
                        }

                        const githubUrl = toGithubBlobUrl(rawUrl, sourceUrl);

                        return (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "my-4",
                                    "inline-flex w-full max-w-65 items-center justify-center",
                                    "rounded-pill px-6 py-3 text-sm font-medium",
                                    "text-on-surface",
                                    "bg-accent hover:bg-accent-hover",
                                    "transition",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                                )}
                            >
                                {imageButtonLabel}
                            </a>
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}