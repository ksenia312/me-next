export function parseGithubRepoUrl(input?: string | null): {
    owner: string;
    repo: string;
    branch: string;
} | null {
    if (!input) return null;

    try {
        const u = new URL(input);
        if (u.hostname !== "github.com") return null;

        const parts = u.pathname.split("/").filter(Boolean);
        if (parts.length < 2) return null;

        const owner = parts[0]!;
        const repo = parts[1]!.replace(/\.git$/, "");

        let branch = "main";
        const treeIndex = parts.indexOf("tree");

        if (treeIndex !== -1 && parts.length > treeIndex + 1) {
            branch = parts[treeIndex + 1]!;
        }

        return {owner, repo, branch};
    } catch {
        return null;
    }
}

export function isAbsoluteUrl(s: string) {
    return /^https?:\/\//i.test(s) || s.startsWith("data:") || s.startsWith("blob:");
}

export function normalizePath(p: string) {
    return p.replace(/^\.?\//, "");
}

export function resolveGithubAssetUrl(
    src: string,
    repoUrl?: string | null,
    kind: "raw" | "blob" = "raw",
) {
    if (!src) return src;
    if (src.startsWith("#")) return src;
    if (isAbsoluteUrl(src)) return src;

    const parsed = parseGithubRepoUrl(repoUrl);
    if (!parsed) return src;

    const {owner, repo, branch} = parsed;
    const path = normalizePath(src.startsWith("/") ? src.slice(1) : src);

    if (kind === "raw") {
        return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    }

    return `https://github.com/${owner}/${repo}/blob/${branch}/${path}`;
}

export function toGithubBlobUrl(src: string, repoUrl?: string | null) {
    if (!src) return src;

    if (!isAbsoluteUrl(src)) {
        return resolveGithubAssetUrl(src, repoUrl, "blob");
    }

    try {
        const u = new URL(src);

        if (u.hostname === "raw.githubusercontent.com") {
            const parts = u.pathname.split("/").filter(Boolean);

            if (parts.length >= 4) {
                const owner = parts[0]!;
                const repo = parts[1]!;
                const branch = parts[2]!;
                const path = parts.slice(3).join("/");

                return `https://github.com/${owner}/${repo}/blob/${branch}/${path}`;
            }
        }

        if (u.hostname === "github.com") {
            u.searchParams.delete("raw");
            return u.toString();
        }

        return src;
    } catch {
        return src;
    }
}

export function isBadgeLikeUrl(url: string) {
    const u = url.toLowerCase();

    if (u.includes("img.shields.io") || u.includes("shields.io")) return true;
    if (u.includes("/badge.svg") || u.endsWith("badge.svg")) return true;
    if (u.includes("/actions/workflows/") && u.endsWith(".svg")) return true;
    if (u.includes("pub.dev") && u.endsWith(".svg")) return true;

    return false;
}