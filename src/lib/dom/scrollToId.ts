export function scrollToId(
    id: string,
    options?: {
        behavior?: ScrollBehavior;
        updateHash?: boolean;
        fallbackToRoot?: boolean;
    },
) {
    if (typeof window === "undefined") return;

    const behavior = options?.behavior ?? "smooth";
    const updateHash = options?.updateHash ?? true;
    const fallbackToRoot = options?.fallbackToRoot ?? true;

    const el = document.getElementById(id);

    if (el) {
        if (updateHash) {
            try {
                history.replaceState(null, "", `#${encodeURIComponent(id)}`);
            } catch {
                try {
                    window.location.hash = id;
                } catch {
                }
            }
        }

        try {
            el.scrollIntoView({behavior, block: "start"});
        } catch {
        }

        return;
    }

    const onRoot =
        window.location.pathname === "/" || window.location.pathname === "";

    if (onRoot) {
        if (updateHash) {
            try {
                history.replaceState(null, "", `#${encodeURIComponent(id)}`);
            } catch {
                try {
                    window.location.hash = id;
                } catch {
                }
            }
        }

        return;
    }

    if (fallbackToRoot) {
        const href = `/#${encodeURIComponent(id)}`;

        try {
            window.location.replace(href);
        } catch {
            try {
                window.location.href = href;
            } catch {
            }
        }
    }
}