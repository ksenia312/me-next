"use client";

const PREFIX = "pp-thumb:";

export function setPetProjectThumb(id: string, src: string) {
    try {
        if (!id || !src) return;
        sessionStorage.setItem(`${PREFIX}${id}`, src);
    } catch {
    }
}

export function getPetProjectThumb(id: string): string | null {
    try {
        if (!id) return null;
        return sessionStorage.getItem(`${PREFIX}${id}`);
    } catch {
        return null;
    }
}