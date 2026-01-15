import Image from "next/image";

const ICONS = {
    googlePlay: "/icons/ic_google_play.svg",
    website: "/icons/ic_external_link.svg",
    github: "/icons/ic_github.svg",
} as const;

function RoundLinkIcon({
                           href,
                           iconSrc,
                           label,
                       }: {
    href: string;
    iconSrc: string;
    label: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-12 w-12 place-items-center rounded-full bg-on-surface hover:opacity-90 transition"
        >
            <Image src={iconSrc} alt="" width={24} height={24} className="block"/>
        </a>
    );
}

export function PetProjectLinks({
                                    googlePlayLink,
                                    websiteLink,
                                    githubLink,
                                }: {
    googlePlayLink?: string | null;
    websiteLink?: string | null;
    githubLink?: string | null;
}) {
    return (
        <div className="flex items-center gap-3">
            {googlePlayLink ? (
                <RoundLinkIcon
                    href={googlePlayLink}
                    iconSrc={ICONS.googlePlay}
                    label="Google Play"
                />
            ) : null}

            {websiteLink ? (
                <RoundLinkIcon href={websiteLink} iconSrc={ICONS.website} label="Website"/>
            ) : null}

            {githubLink ? (
                <RoundLinkIcon href={githubLink} iconSrc={ICONS.github} label="GitHub"/>
            ) : null}
        </div>
    );
}