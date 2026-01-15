import type {PetProjectData} from "@/lib/features/projects/types";
import {PetProjectLinks} from "@/features/pet-project/PetProjectLinks";

export function PetProjectTitle({
                                    title,
                                    subtitle,
                                    data,
                                }: {
    title: string;
    subtitle: string;
    data: PetProjectData;
}) {
    return (
        <div className="pt-10">
            <div className="flex flex-col gap-8 s:flex-row s:items-center s:justify-between">
                <div>
                    <h1 className="text-2xl s:text-3xl font-semibold tracking-wide">
                        {title}
                    </h1>
                    <p className="mt-3 text-on-surface/80">{subtitle}</p>
                </div>

                <PetProjectLinks
                    googlePlayLink={data.googlePlayLink}
                    websiteLink={data.websiteLink}
                    githubLink={data.githubLink}
                />
            </div>
        </div>
    );
}