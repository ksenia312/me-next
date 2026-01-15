import localFont from "next/font/local";

export const onest = localFont({
    variable: "--font-onest",
    display: "swap",
    preload: true,
    fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial"],
    src: [
        {
            path: "../assets/fonts/Onest-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/Onest-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/Onest-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../assets/fonts/Onest-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
});