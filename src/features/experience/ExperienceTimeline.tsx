import type {ExperienceItem} from "@/hooks/useExperienceItems";
import {ExperienceItemRow} from "@/features/experience/ExperienceItemRow";
import {TimelineRail} from "@/features/experience/TimelineRail";

export function ExperienceTimeline({items}: { items: ExperienceItem[] }) {
    return (
        <div className="relative pt-12 pb-12 m:pt-0 m:pb-0">
            <TimelineRail/>

            <div className="space-y-18">
                {items.map((it) => (
                    <ExperienceItemRow key={it.id} item={it}/>
                ))}
            </div>
        </div>
    );
}