import "server-only";

export const envServer = {
    firebaseAdmin: {
        projectId: must(
            process.env.FIREBASE_ADMIN_PROJECT_ID,
            "FIREBASE_ADMIN_PROJECT_ID",
        ),
        clientEmail: must(
            process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            "FIREBASE_ADMIN_CLIENT_EMAIL",
        ),
        privateKey: must(
            process.env.FIREBASE_ADMIN_PRIVATE_KEY,
            "FIREBASE_ADMIN_PRIVATE_KEY",
        ).replace(/\\n/g, "\n"),
        storageBucket: must(
            process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
            "FIREBASE_ADMIN_STORAGE_BUCKET",
        ),
    },
} as const;

function must(v: string | undefined, name: string): string {
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}