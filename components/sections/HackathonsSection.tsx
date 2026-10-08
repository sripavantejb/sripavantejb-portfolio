"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { hackathons } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";

type HackathonPhoto = (typeof hackathons)[number]["photos"][number];

function PhotoFrame({
  photo,
  sizes,
  priority,
  className,
  imageClassName,
  style,
}: {
  photo: HackathonPhoto;
  sizes: string;
  priority?: boolean;
  className: string;
  imageClassName?: string;
  style?: React.CSSProperties;
}) {
  const contain = "fit" in photo && photo.fit === "contain";
  const caption = "caption" in photo ? photo.caption : undefined;

  return (
    <figure className={`relative overflow-hidden ${className}`} style={style}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName ?? (contain ? "object-contain" : "object-cover")}
      />
      {caption && !contain ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-10 font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function HackathonsSection() {
  const [featured, ...others] = hackathons;
  const pitch = featured.photos[0];
  const morePhotos: readonly HackathonPhoto[] = featured.photos.slice(1);

  return (
    <section id="hackathons" className={`bg-lime py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading
          eyebrow="Hackathons"
          title="Hackathons"
          chip="white"
          description="Building under pressure. Solving real problems."
        />

        <p className="mt-6 max-w-2xl font-inter text-base font-medium leading-relaxed text-ink/70 md:text-lg">
          Hackathons have been where I&rsquo;ve taken ideas from zero to working prototypes — combining AI, automation,
          data, and full-stack development to solve problems beyond the classroom.
        </p>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 overflow-hidden border-4 border-ink bg-white shadow-[8px_8px_0_0_#0a0a0a]"
        >
          <span className="absolute right-4 top-4 z-10 rotate-3 border-2 border-ink bg-lime px-2.5 py-1 font-archivo text-[10px] uppercase tracking-wide text-ink shadow-[3px_3px_0_0_#0a0a0a] md:right-6 md:top-6">
            {featured.result}
          </span>

          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="relative aspect-[3/2] min-h-[220px] border-b-4 border-ink md:aspect-auto md:h-full md:min-h-full md:border-b-0 md:border-r-4">
              <PhotoFrame
                photo={pitch}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full min-h-full w-full"
                imageClassName="object-cover object-[center_18%]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                {featured.event}
              </p>
              <h3 className="mt-3 max-w-xl font-archivo text-xl uppercase leading-tight tracking-tight md:text-2xl">
                {featured.title}
              </h3>
              <p className="mt-4 font-inter text-sm font-medium leading-relaxed text-ink/65 md:text-base">
                {featured.body}
              </p>
              <p className="mt-5 font-inter text-[10px] font-bold uppercase tracking-widest text-ink/35">
                {featured.label}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/20 bg-ink/5 px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-wide text-ink/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {"team" in featured && featured.team ? (
                <p className="mt-5 font-inter text-xs text-ink/50">Team: {featured.team}</p>
              ) : null}
            </div>
          </div>

          {morePhotos.length === 1 ? (
            <PhotoFrame
              photo={morePhotos[0]}
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="aspect-[3/2] border-t-4 border-ink md:aspect-[2/1]"
              imageClassName="object-cover object-[center_42%]"
            />
          ) : (
            <div className="grid border-t-4 border-ink md:grid-cols-2">
              {morePhotos.map((photo, index) => (
                <PhotoFrame
                  key={photo.src}
                  photo={photo}
                  sizes="(max-width: 768px) 100vw, 550px"
                  className={`aspect-[3/2] ${index > 0 ? "border-t-4 border-ink md:border-l-4 md:border-t-0" : ""}`}
                  imageClassName="object-cover object-center"
                />
              ))}
            </div>
          )}
        </motion.article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {others.map((h, i) => {
            const photo: HackathonPhoto = h.photos[0];
            const contain = "fit" in photo && photo.fit === "contain";
            const background = "background" in photo ? photo.background : "#3d0c14";

            return (
              <motion.article
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col overflow-hidden border-4 border-ink bg-white shadow-[8px_8px_0_0_#0a0a0a]"
              >
                <PhotoFrame
                  photo={photo}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={contain ? "aspect-[800/562]" : "aspect-[3/2]"}
                  style={contain ? { backgroundColor: background } : undefined}
                  imageClassName={contain ? "object-contain" : "object-cover object-center"}
                />
                {contain && "caption" in photo && photo.caption ? (
                  <p className="-mt-px border-t-2 border-ink/10 bg-ink/5 px-4 py-2.5 font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/50">
                    {photo.caption}
                  </p>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                      {h.event}
                    </p>
                    <span className="border-2 border-ink bg-lime px-2 py-0.5 font-archivo text-[10px] uppercase tracking-wide">
                      {h.result}
                    </span>
                  </div>
                  <h3 className="mt-4 font-archivo text-lg uppercase leading-tight tracking-tight">{h.title}</h3>
                  <p className="mt-3 font-inter text-sm font-medium leading-relaxed text-ink/65">{h.body}</p>
                  <p className="mt-5 font-inter text-[10px] font-bold uppercase tracking-widest text-ink/35">{h.label}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {h.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/20 bg-ink/5 px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-wide text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {"stack" in h && h.stack ? (
                    <>
                      <p className="mt-5 font-inter text-[10px] font-bold uppercase tracking-widest text-ink/35">
                        Tech
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {h.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-ink/20 bg-ink/5 px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-wide text-ink/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                  <div className="mt-auto border-t-2 border-ink/10 pt-5 font-inter text-xs font-medium text-ink/50">
                    {"team" in h && h.team ? <p>Team: {h.team}</p> : null}
                    {"when" in h && h.when ? <p>{h.when}</p> : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 max-w-2xl border-t-2 border-ink/15 pt-10">
          <p className="font-archivo text-sm uppercase tracking-tight">From idea → prototype → pitch.</p>
          <p className="mt-4 font-inter text-sm font-medium leading-relaxed text-ink/70 md:text-base">
            Every hackathon taught me something different — from building under tight deadlines to working with
            teammates, understanding the real problem, making technical trade-offs, and learning how to communicate why
            something deserves to exist.
          </p>
          <p className="mt-4 font-inter text-sm font-semibold">Still building. Still competing. Still learning.</p>
        </div>
      </div>
    </section>
  );
}
