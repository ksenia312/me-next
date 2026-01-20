import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import "./globals.css";

import {onest} from "@/app/fonts";
import {Providers} from "@/app/providers";
import {I18nProvider} from "@/i18n/I18nProvider";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TITLE = "Kseniia | Mobile Developer";
const DESCRIPTION = "Experience the ultimate pleasure of browsing Kseniia's site";
const OG_IMAGE_URL =
    "https://github-production-user-asset-6210df.s3.amazonaws.com/71008947/538199475-0664a467-177a-4375-b24a-420ef948fd08.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260120T193909Z&X-Amz-Expires=300&X-Amz-Signature=126518c34a353dece9db19db1e95afd598215d379d32259bb30d991de91a289f&X-Amz-SignedHeaders=host";

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
    return (
        <html lang="en">
        <body className={`${onest.variable} antialiased`}>
        <I18nProvider>
            <Providers>
                {children}
            </Providers>
        </I18nProvider>
        </body>
        </html>
    );
}