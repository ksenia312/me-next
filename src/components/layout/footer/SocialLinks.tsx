import Image from "next/image";

const LINKS = [
    {
        href: "https://www.linkedin.com/in/xenikii",
        label: "LinkedIn",
        iconSrc: "/icons/ic_linked_in.svg",
    },
    {
        href: "https://github.com/ksenia312",
        label: "GitHub",
        iconSrc: "/icons/ic_github.svg",
    },
    {
        href: "https://t.me/xenikii",
        label: "Telegram",
        iconSrc: "/icons/ic_telegram.svg",
    },
] as const;

export function SocialLinks() {
    return (
        <div className="mx-auto flex items-center justify-center gap-6 px-[var(--lm)]">
            {LINKS.map((it) => (
                <a
                    key={it.href}
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={it.label}
                    className={[
                        "grid h-11 w-11 place-items-center rounded-full",
                        "bg-on-surface",
                        "transition hover:opacity-90",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    ].join(" ")}
                >
                    <Image
                        src={it.iconSrc}
                        alt=""
                        width={20}
                        height={20}
                        className="block"
                    />
                </a>
            ))}
        </div>
    );
}