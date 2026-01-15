import "server-only";

import admin, {type ServiceAccount} from "firebase-admin";

import {envServer} from "@/config/env.server";

declare global {
    var __firebaseAdminApp: admin.app.App | undefined;
}

function getAdminApp(): admin.app.App {
    if (globalThis.__firebaseAdminApp) return globalThis.__firebaseAdminApp;

    const app =
        admin.apps.length > 0
            ? admin.apps[0]!
            : admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: envServer.firebaseAdmin.projectId,
                    clientEmail: envServer.firebaseAdmin.clientEmail,
                    privateKey: envServer.firebaseAdmin.privateKey,
                } as ServiceAccount),
                storageBucket: envServer.firebaseAdmin.storageBucket,
            });

    globalThis.__firebaseAdminApp = app;

    return app;
}

export function getAdminFirestore() {
    return admin.firestore(getAdminApp());
}

export function getAdminStorage() {
    return admin.storage(getAdminApp());
}