import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import "./globals.css";

import {onest} from "@/app/fonts";
import {Providers} from "@/app/providers";
import {I18nProvider} from "@/i18n/I18nProvider";
import {getPetProjectCards} from "@/lib/features/projects/server";

export const revalidate = 3600;

const TITLE = "Kseniia | Mobile Developer";
const DESCRIPTION = "Experience the ultimate pleasure of browsing Kseniia's site";
const OG_IMAGE_URL =
    "https://github.com/user-attachments/assets/49a2cd3c-1d7d-4754-8b0b-e80925e5d485";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: "black",
        title: "Kseniia Nikitina",
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        type: "website",
        images: [{url: OG_IMAGE_URL}],
    },
    icons: {
        icon: [
            {url: "/icons/favicon/favicon.ico"},
            {
                url: "/icons/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                url: "/icons/favicon/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/icons/favicon/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        apple: [{url: "/icons/favicon/apple-touch-icon.png", sizes: "180x180"}],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    const initialPetProjects = await getPetProjectCards();

    return (
        <html lang="en">
        <body className={`${onest.variable} antialiased`}>
        <I18nProvider>
            <Providers initialPetProjects={initialPetProjects}>
                {children}
            </Providers>
        </I18nProvider>
        </body>
        </html>
    );
}