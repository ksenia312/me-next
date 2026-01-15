import type {ReactNode} from "react";

export function HeaderIconButton({
                                     label,
                                     onClick,
                                     children,
                                 }: {
    label: string;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="grid h-10 w-10 place-items-center rounded-toolbar hover:bg-secondary/60 transition text-on-surface"
        >
            {children}
        </button>
    );
}