"use client";

import {type FirebaseApp, getApps, initializeApp} from "firebase/app";

import {env} from "@/config/env";

const firebaseConfig = {
    apiKey: env.firebase.apiKey,
    appId: env.firebase.appId,
    messagingSenderId: env.firebase.messagingSenderId,
    projectId: env.firebase.projectId,
    authDomain: env.firebase.authDomain,
    storageBucket: env.firebase.storageBucket,
    measurementId: env.firebase.measurementId,
};

export function getFirebaseApp(): FirebaseApp {
    return getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
}