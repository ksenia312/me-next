export type PetProjectData = {
    id: string;
    order: number;
    titles: Record<string, string>;
    subtitles: Record<string, string>;
    imageStoragePath: string;
    accentColor: string;
    androidDemoAspectRatio?: number | null;
    iosDemoAspectRatio?: number | null;
    githubLink?: string | null;
    googlePlayLink?: string | null;
    websiteLink?: string | null;
    androidStoragePath?: string | null;
    iosStoragePath?: string | null;
};

export type PetProjectCardVM = {
    data: PetProjectData;
    imageUrl: string | null;
};

export type PetProjectPageVM = {
    data: PetProjectData;
    coverImageUrl: string | null;
    androidDemoUrl: string | null;
    iosDemoUrl: string | null;
};

export type PetProjectCardsResult = {
    vms: PetProjectCardVM[];
    count: number;
};

export type FirestorePetProjectDoc = {
    order?: number;
    titleJson?: string;
    subtitleJson?: string;
    imageStoragePath: string;
    color: string;
    androidDemo?: string | null;
    androidDemoAspectRatio?: number | null;
    iosDemo?: string | null;
    iosDemoAspectRatio?: number | null;
    github?: string | null;
    googlePlay?: string | null;
    website?: string | null;
};