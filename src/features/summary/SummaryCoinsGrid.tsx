import type {TFunction} from "i18next";

import SummaryCoin from "@/features/summary/SummaryCoin";
import AppButton from "@/components/ui/AppButton";
import {links} from "@/lib/features/profile/client";

type Props = {
    t: TFunction;
    overall: number;
    flutter: number;
};

export function SummaryCoinsGrid({t, overall, flutter}: Props) {
    return (
        <div className="grid grid-cols-1 justify-items-center gap-y-6 gap-x-6 s:grid-cols-2 m:grid-cols-3 m:gap-x-8">
            <SummaryCoin
                title={t("year", {count: overall, n: overall})}
                subtitle={t("summary.totalExperience.subtitle")}
                back={<p>{t("summary.totalExperience.content")}</p>}
            />

            <SummaryCoin
                title={t("year", {count: flutter, n: flutter})}
                subtitle={t("summary.mobileExperience.subtitle")}
                back={
                    <p>
                        {t("summary.mobileExperience.content1")}{" "}
                        <span className="font-semibold">
              {t("summary.mobileExperience.content2")}
            </span>{" "}
                        {t("summary.mobileExperience.content3")}{" "}
                        <span className="font-semibold">
              {t("summary.mobileExperience.content4")}
            </span>{" "}
                        {t("summary.mobileExperience.content5")}
                    </p>
                }
            />

            <SummaryCoin
                title={t("summary.highEducation.title")}
                subtitle={t("summary.highEducation.subtitle")}
                back={
                    <p>
                        {t("summary.highEducation.content1")}{" "}
                        <span className="font-semibold">
              {t("summary.highEducation.content2")}
            </span>
                    </p>
                }
            />

            <SummaryCoin
                title={t("summary.openSource.title")}
                subtitle={t("summary.openSource.subtitle")}
                back={
                    <div className="flex flex-col items-center gap-3">
                        <p>{t("summary.openSource.content")}</p>
                        <AppButton
                            as="a"
                            size="small"
                            href={links.package}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("summary.openSource.contentButton")}
                        </AppButton>
                    </div>
                }
            />

            <SummaryCoin
                title={t("summary.googlePlay.title")}
                subtitle={t("summary.googlePlay.subtitle")}
                back={
                    <div className="flex flex-col items-center gap-3">
                        <p>{t("summary.googlePlay.content")}</p>
                        <AppButton
                            as="a"
                            size="small"
                            href={links.app}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("summary.googlePlay.contentButton")}
                        </AppButton>
                    </div>
                }
            />

            <SummaryCoin
                title={t("summary.english.title")}
                subtitle={t("summary.english.subtitle")}
                back={<p>{t("summary.english.content")}</p>}
            />
        </div>
    );
}