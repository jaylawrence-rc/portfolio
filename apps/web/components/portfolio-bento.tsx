"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Globe2, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { playInteractionTick, preloadInteractionTick } from "@/components/interaction-sound";
import { ProjectVisual } from "@/components/project-visual";

type BentoProject = {
  slug: string;
  title: string;
  company: string;
  summary: string;
  industry: string;
  accent: string;
  liveUrl?: string;
  allowsEmbedding?: boolean;
};

type BentoExperience = {
  company: string;
  role: string;
  period: string;
};

type BentoSkillGroup = {
  label: string;
  skills: readonly string[];
};

type PortfolioBentoProps = {
  projects: BentoProject[];
  experience: readonly BentoExperience[];
  skillGroups: readonly BentoSkillGroup[];
};

type ProjectSelection = {
  index: number;
  direction: "next" | "previous";
  revision: number;
};

type CardMotion = {
  distance: number;
  reduced: boolean;
};

type ProjectMotion = {
  direction: ProjectSelection["direction"];
  reduced: boolean;
};

const MotionLink = motion.create(Link);

const bentoGridVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.055,
    },
  },
};

const bentoCardVariants = {
  hidden: ({ distance, reduced }: CardMotion) => ({
    opacity: 0,
    transform: reduced ? "none" : `translateY(${distance}px) scale(0.988)`,
  }),
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: {
      transform: { type: "spring" as const, duration: 0.58, bounce: 0 },
      opacity: { duration: 0.28, ease: "easeOut" as const },
    },
  },
};

const projectVariants = {
  enter: ({ direction, reduced }: ProjectMotion) => ({
    opacity: 0,
    transform: reduced
      ? "none"
      : `translateX(${direction === "next" ? 18 : -18}px) scale(0.992)`,
  }),
  center: {
    opacity: 1,
    transform: "translateX(0px) scale(1)",
  },
  exit: ({ direction, reduced }: ProjectMotion) => ({
    opacity: 0,
    transform: reduced
      ? "none"
      : `translateX(${direction === "next" ? -18 : 18}px) scale(0.992)`,
  }),
};

const projectTransition = {
  transform: { type: "spring" as const, duration: 0.4, bounce: 0 },
  opacity: { duration: 0.18, ease: "easeOut" as const },
};

export function PortfolioBento({ projects, experience, skillGroups }: PortfolioBentoProps) {
  const firstEmbeddableProject = projects[0]?.liveUrl && projects[0].allowsEmbedding !== false ? projects[0] : null;
  const [selection, setSelection] = useState<ProjectSelection>({ index: 0, direction: "next", revision: 0 });
  const [liveProjectSlug, setLiveProjectSlug] = useState<string | null>(() => firstEmbeddableProject?.slug ?? null);
  const [liveStatus, setLiveStatus] = useState<"idle" | "loading" | "ready" | "failed">(() => firstEmbeddableProject ? "loading" : "idle");
  const shouldReduceMotion = Boolean(useReducedMotion());
  const activeProject = projects[selection.index];

  useEffect(() => {
    if (activeProject?.liveUrl && activeProject.allowsEmbedding !== false) {
      setLiveProjectSlug(activeProject.slug);
      setLiveStatus("loading");
      return;
    }

    setLiveProjectSlug(null);
    setLiveStatus("idle");
  }, [activeProject?.allowsEmbedding, activeProject?.liveUrl, activeProject?.slug]);

  function moveProject(direction: ProjectSelection["direction"]) {
    playInteractionTick();
    setLiveProjectSlug(null);
    setLiveStatus("idle");
    setSelection((current) => {
      const step = direction === "next" ? 1 : -1;
      return {
        index: (current.index + step + projects.length) % projects.length,
        direction,
        revision: current.revision + 1,
      };
    });
  }

  function startLivePreview() {
    if (!activeProject?.liveUrl || activeProject.allowsEmbedding === false) return;
    playInteractionTick();
    setLiveProjectSlug(activeProject.slug);
    setLiveStatus("loading");
  }

  function stopLivePreview() {
    playInteractionTick();
    setLiveProjectSlug(null);
    setLiveStatus("idle");
  }

  if (!activeProject) return null;
  const isLivePreview = liveProjectSlug === activeProject.slug;
  const projectMotion = { direction: selection.direction, reduced: shouldReduceMotion };

  return (
    <MotionConfig reducedMotion="user">
      <section className="section shell portfolio-bento" aria-labelledby="portfolio-at-a-glance">
        <div className="section-heading bento-heading">
          <div>
            <p className="eyebrow">Portfolio at a glance</p>
            <h2 id="portfolio-at-a-glance">The useful version of the whole story.</h2>
          </div>
          <p>Browse the work, scan the experience, or follow the part that matters to you.</p>
        </div>

        <motion.div
          className="bento-grid"
          variants={bentoGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
        <motion.article
          className="bento-card bento-project"
          custom={{ distance: 18, reduced: shouldReduceMotion }}
          variants={bentoCardVariants}
          style={{ "--bento-project-accent": activeProject.accent } as CSSProperties}
        >
          <div className="bento-card-surface">
            <header className="bento-project-header">
              <div>
                <p className="bento-kicker">Selected project</p>
                <p className="bento-project-count" aria-live="polite">
                  <AnimatePresence initial={false} mode="popLayout" custom={projectMotion}>
                    <motion.span
                      key={selection.index}
                      custom={projectMotion}
                      variants={projectVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={projectTransition}
                    >
                      {String(selection.index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
              <div className="bento-project-header-actions">
                <AnimatePresence initial={false}>
                  {isLivePreview && activeProject.liveUrl ? (
                    <motion.div
                      className="bento-live-toolbar"
                      key={`toolbar-${activeProject.slug}`}
                      layoutId={shouldReduceMotion ? undefined : `live-control-${activeProject.slug}`}
                      style={{ borderRadius: 8 }}
                      transition={{ type: "spring", duration: 0.42, bounce: 0 }}
                    >
                      <span><i aria-hidden="true" /> Live site · scroll inside</span>
                      <span>
                        <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${activeProject.title} in a new tab`}>
                          <ExternalLink size={13} aria-hidden="true" />
                        </a>
                        <button type="button" onClick={stopLivePreview} aria-label="Close live site preview">
                          <X size={14} aria-hidden="true" />
                        </button>
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <div className="bento-project-controls" aria-label="Choose a project">
                  <button
                    type="button"
                    aria-label="Show previous project"
                    onClick={() => moveProject("previous")}
                    onPointerEnter={preloadInteractionTick}
                  >
                    <ChevronLeft size={17} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show next project"
                    onClick={() => moveProject("next")}
                    onPointerEnter={preloadInteractionTick}
                  >
                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </header>

            <div className="bento-macbook" aria-label={`${activeProject.title} project preview`}>
              <div className="bento-macbook-screen">
                <i className="bento-macbook-camera" aria-hidden="true" />
                <div className="bento-project-stage">
                  <AnimatePresence initial={false} mode="popLayout" custom={projectMotion}>
                    <motion.div
                      className="bento-project-view"
                      key={`${activeProject.slug}-${selection.revision}`}
                      custom={projectMotion}
                      variants={projectVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={projectTransition}
                    >
                    <ProjectVisual project={activeProject} compact />
                    <AnimatePresence initial={false}>
                      {isLivePreview && activeProject.liveUrl ? (
                        <motion.div
                          className="bento-live-layer"
                          key={`live-${activeProject.slug}`}
                          initial={{ opacity: 0, transform: shouldReduceMotion ? "none" : "scale(0.99)" }}
                          animate={{ opacity: 1, transform: "scale(1)" }}
                          exit={{ opacity: 0, transform: shouldReduceMotion ? "none" : "scale(0.99)" }}
                          transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
                        >
                          <iframe
                            className="bento-live-frame"
                            data-status={liveStatus}
                            src={activeProject.liveUrl}
                            title={`${activeProject.title} live website`}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                            onLoad={() => setLiveStatus("ready")}
                            onError={() => setLiveStatus("failed")}
                          />
                          {liveStatus === "loading" ? <span className="bento-live-message" role="status">Loading live site…</span> : null}
                          {liveStatus === "failed" ? (
                            <span className="bento-live-message" role="alert">
                              This site could not load here. <a href={activeProject.liveUrl} target="_blank" rel="noreferrer">Open it in a new tab.</a>
                            </span>
                          ) : null}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <AnimatePresence initial={false}>
                  {activeProject.liveUrl && activeProject.allowsEmbedding !== false && !isLivePreview ? (
                    <motion.button
                      className="bento-live-launch"
                      key={`launch-${activeProject.slug}`}
                      layoutId={shouldReduceMotion ? undefined : `live-control-${activeProject.slug}`}
                      style={{ borderRadius: 9 }}
                      transition={{ type: "spring", duration: 0.42, bounce: 0 }}
                      type="button"
                      onClick={startLivePreview}
                      onPointerEnter={preloadInteractionTick}
                    >
                      <Globe2 size={14} aria-hidden="true" /> Explore live site
                    </motion.button>
                  ) : null}
                  {activeProject.liveUrl && activeProject.allowsEmbedding === false && !isLivePreview ? (
                    <motion.a className="bento-live-launch" key={`external-${activeProject.slug}`} href={activeProject.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} aria-hidden="true" /> Open live site
                    </motion.a>
                  ) : null}
                    </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="bento-macbook-base" aria-hidden="true"><i /></div>
            </div>

            <footer className="bento-project-footer">
              <div aria-live="polite">
                <AnimatePresence initial={false} mode="popLayout" custom={projectMotion}>
                  <motion.div
                    className="bento-project-copy-swap"
                    key={activeProject.slug}
                    custom={projectMotion}
                    variants={projectVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={projectTransition}
                  >
                    <span>{activeProject.company} · {activeProject.industry}</span>
                    <h3>{activeProject.title}</h3>
                    <p>{activeProject.summary}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <Link href={`/work/${activeProject.slug}`} aria-label={`Read the ${activeProject.title} case study`}>
                Case study <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </footer>
          </div>
        </motion.article>

        <MotionLink className="bento-card bento-experience" href="/resume" custom={{ distance: 12, reduced: shouldReduceMotion }} variants={bentoCardVariants}>
          <span className="bento-card-surface">
            <span className="bento-card-topline">
              <span className="bento-kicker">Experience</span>
              <span>4+ years</span>
            </span>
            <strong>Product ownership across international teams and real-world software.</strong>
            <span className="bento-markets">
              <small>International product work</small>
              <span><i>US</i><i>Germany</i><i>London</i></span>
            </span>
            <span className="bento-role-list">
              {experience.map((item) => (
                <span className="bento-role" key={`${item.company}-${item.period}`}>
                  <span>{item.company}</span>
                  <small>{item.role}</small>
                </span>
              ))}
            </span>
            <span className="bento-card-link">Read the résumé <ArrowRight size={15} aria-hidden="true" /></span>
          </span>
        </MotionLink>

        <MotionLink className="bento-card bento-about" href="/about" custom={{ distance: 14, reduced: shouldReduceMotion }} variants={bentoCardVariants}>
          <span className="bento-card-surface">
            <span className="bento-card-topline">
              <span className="bento-kicker">About me</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
            <strong>Engineer, product partner, systems thinker.</strong>
            <span className="bento-body-copy">Based in the Philippines, working remotely with teams that care about useful products and thoughtful execution.</span>
            <span className="bento-signature" aria-hidden="true"><i>JL</i><span>GMT+8</span></span>
          </span>
        </MotionLink>

        <MotionLink className="bento-card bento-skills" href="/resume" custom={{ distance: 10, reduced: shouldReduceMotion }} variants={bentoCardVariants}>
          <span className="bento-card-surface">
            <span className="bento-card-topline">
              <span className="bento-kicker">Skills & tools</span>
              <span>Full-stack · frontend-leaning</span>
            </span>
            <strong>From product surface to production system.</strong>
            <span className="bento-skill-groups">
              {skillGroups.map((group) => (
                <span className="bento-skill-group" key={group.label}>
                  <small>{group.label}</small>
                  <span>{group.skills.slice(0, 4).join(" · ")}</span>
                </span>
              ))}
            </span>
          </span>
        </MotionLink>

        <MotionLink className="bento-card bento-method" href="/about" custom={{ distance: 7, reduced: shouldReduceMotion }} variants={bentoCardVariants}>
          <span className="bento-card-surface">
            <span className="bento-card-topline">
              <span className="bento-kicker">How I work</span>
              <span>03 principles</span>
            </span>
            <span className="bento-method-list">
              <span><i>01</i> Judgment before implementation</span>
              <span><i>02</i> Systems that stay clear</span>
              <span><i>03</i> Motion with a purpose</span>
            </span>
          </span>
        </MotionLink>

        <MotionLink className="bento-card bento-contact" href="/contact" custom={{ distance: 0, reduced: shouldReduceMotion }} variants={bentoCardVariants}>
          <span className="bento-card-surface">
            <span className="bento-kicker">Now</span>
            <strong>Available for selected product engineering roles.</strong>
            <span className="bento-card-link">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></span>
          </span>
        </MotionLink>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
