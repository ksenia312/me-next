import "server-only";

import {parseGithubRepoUrl} from "@/lib/features/markdown/client";

function rawReadmeUrl(owner: string, repo: string, branch: string) {
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
}

async function fetchText(url: string): Promise<string | null> {
    const res = await fetch(url, {
        cache: "no-store",
        headers: {
            "User-Agent": "nextjs-readme-fetch",
        },
    });

    if (!res.ok) return null;

    const text = await res.text();
    return text || null;
}

export async function fetchGithubReadmeMarkdown(
    repoUrl: string,
): Promise<string | null> {
    const parsed = parseGithubRepoUrl(repoUrl);
    if (!parsed) return null;

    const {owner, repo} = parsed;

    const preferred = parsed.branch ?? "main";
    const tryBranches =
        preferred === "main" ? ["main", "master"] : [preferred, "main", "master"];

    for (const b of tryBranches) {
        const md = await fetchText(rawReadmeUrl(owner, repo, b));
        if (md) return md;
    }

    return null;
}