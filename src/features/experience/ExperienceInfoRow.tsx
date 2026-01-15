import Image from "next/image";

export function ExperienceInfoRow({
                                      iconSrc,
                                      text,
                                      dim,
                                  }: {
    iconSrc: string;
    text: string;
    dim?: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
      <span className="relative h-4 w-4 shrink-0">
        <Image src={iconSrc} alt="" fill className="object-contain" sizes="24px"/>
      </span>
            <div className={dim ? "text-on-surface/60" : "text-on-surface/85"}>
                {text}
            </div>
        </div>
    );
}