import * as React from "react";

import {cn} from "@/lib/cn";

type BaseProps = {
    size?: "default" | "small";
    className?: string;
};

type ButtonProps = BaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
};

type AnchorProps = BaseProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
};

export type AppButtonProps = ButtonProps | AnchorProps;

const AppButton = React.forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    AppButtonProps
>(function AppButton(props, ref) {
    const {size = "default", className} = props;

    const h = size === "small" ? "h-10" : "h-12";

    const base = cn(
        "inline-flex items-center justify-center",
        h,
        "min-w-[150px]",
        "rounded-full",
        "px-6",
        "font-medium",
        "text-on-surface",
        "transition",
        "bg-[var(--color-accent)]",
        "hover:bg-[var(--color-accent-hover)]",
        "active:bg-[var(--color-accent-hover)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "shadow-[0_10px_25px_rgba(0,0,0,0.25)]",
        className,
    );

    if (props.as === "a") {
        const {as: _as, ...aProps} = props;

        return (
            <a
                {...aProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                className={base}
            />
        );
    }

    const {as: _as, type, ...bProps} = props as ButtonProps;

    return (
        <button
            {...bProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type={type ?? "button"}
            className={base}
        />
    );
});
export default AppButton