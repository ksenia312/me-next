import {AppChip} from "@/components/ui/AppChip";
import type {ExperienceItem} from "@/hooks/useExperienceItems";
import {ExperienceCard} from "@/features/experience/ExperienceCard";
import {ExperienceInfoRow} from "@/features/experience/ExperienceInfoRow";
import {ExperienceMetaBetweenCards, ExperienceMetaMobileHeader,} from "@/features/experience/ExperienceMeta";

export function ExperienceItemRow({item}: { item: ExperienceItem }) {
    const betweenCards = 16;

    return (
        <div
            className="relative z-10 flex flex-col gap-4 m:grid m:gap-x-6 m:gap-y-0"
            style={{
                gridTemplateColumns: "260px 1fr",
                gridTemplateRows: `auto ${betweenCards}px auto`,
            }}
        >
            <div className="m:hidden w-full">
                <ExperienceMetaMobileHeader item={item}/>
            </div>

            <div className="m:col-start-2 m:row-start-1 m:justify-self-start">
                <div className="w-full max-w-full m:w-fit">
                    <ExperienceCard>
                        <div className="text-xl font-semibold">{item.title}</div>

                        <div className="mt-4 space-y-2">
                            <ExperienceInfoRow
                                iconSrc="/icons/ic_organization.svg"
                                text={item.organization}
                            />
                            <ExperienceInfoRow
                                iconSrc="/icons/ic_pointer.svg"
                                text={item.location}
                                dim
                            />
                        </div>
                    </ExperienceCard>
                </div>
            </div>

            <div className="m:col-start-2 m:row-start-3">
                <ExperienceCard>
                    <div className="text-on-surface/90">{item.subtitle}</div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {item.skills.map((s) => (
                            <AppChip key={s} text={s}/>
                        ))}
                    </div>

                    {item.achievements.length ? (
                        <ul className="mt-6 space-y-3">
                            {item.achievements.map((a) => (
                                <li
                                    key={a}
                                    className="flex gap-3 text-on-surface/85 leading-relaxed"
                                >
                                    <span className="mt-2.25 h-1 w-1 rounded-full bg-primary/80"/>
                                    <span>{a}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </ExperienceCard>
            </div>

            <div className="hidden w-full items-center m:col-start-1 m:row-start-2 m:flex">
                <ExperienceMetaBetweenCards item={item}/>
            </div>
        </div>
    );
}