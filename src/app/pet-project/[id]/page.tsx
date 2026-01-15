'use server'
import type {PetProjectPageVM} from "@/lib/features/projects/types";
import {getPetProjectPageVM} from "@/lib/features/projects/serverPage";
import {PetProjectPageClient} from "@/features/pet-project/PetProjectPageClient";

export default async function Page({
                                       params,
                                   }: {
    params: { id: string } | Promise<{ id: string }>;
}) {
    const {id} = await params;

    const vm: PetProjectPageVM | null = await getPetProjectPageVM(id);

    return (
        <main>
            <PetProjectPageClient id={id} vm={vm}/>
        </main>
    );
}