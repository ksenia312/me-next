"use client";

export const env = {
    firebase: {
        apiKey: must(
            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            "NEXT_PUBLIC_FIREBASE_API_KEY",
        ),
        appId: must(
            process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            "NEXT_PUBLIC_FIREBASE_APP_ID",
        ),
        messagingSenderId: must(
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
        ),
        projectId: must(
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
        ),
        authDomain: must(
            process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
        ),
        storageBucket: must(
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
        ),
        measurementId: must(
            process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
            "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
        ),
    },
} as const;

function must(v: string | undefined, name: string): string {
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}