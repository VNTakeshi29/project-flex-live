"use client";

import { LayoutGroup, motion, useMotionValue, useMotionValueEvent, useReducedMotion, animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { projects } from "@/lib/projects";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { fadeUp, staggerContainer } from "@/components/motion/variants";

const filters = ["all", "active", "archived"] as const;

type Filter = (typeof filters)[number];

type ProjectsProps = {};

function AnimatedCount({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 0.4, ease: "easeOut" });
    return () => controls.stop();
  }, [value, reduceMotion, motionValue]);

  return <span className="text-slate-900 dark:text-white">{display}</span>;
}

export default function Projects({}: ProjectsProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const initialState = reduceMotion ? false : "hidden";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "all" ? true : project.status === filter;
      const searchTarget = `${project.title} ${project.role ?? ""} ${project.description}`.toLowerCase();
      const matchesQuery = q.length === 0 ? true : searchTarget.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const activeProjects = filtered.filter((project) => project.status === "active");
  const archivedProjects = filtered.filter((project) => project.status === "archived");

  return (
    <section ref={ref} id="projects" className="relative mx-auto max-w-6xl px-6 pb-24">
      <motion.div variants={fadeUp} initial={initialState} animate={inView ? "show" : "hidden"}>
        <h2 className="font-display text-3xl text-slate-900 dark:text-white sm:text-4xl">Projects</h2>
        <p className="mt-2 text-slate-500 dark:text-white/60">Active drops + archived lore</p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial={initialState}
        animate={inView ? "show" : "hidden"}
        className="mt-8 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex flex-1 items-center gap-4">
          <label className="relative w-full max-w-md">
            <span className="sr-only">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, role, or vibe..."
              className="w-full rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-neon-cyan/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
            />
          </label>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">
            Results: <AnimatedCount value={filtered.length} />
          </div>
        </div>

        <LayoutGroup>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((value) => (
              <Chip
                key={value}
                label={value === "all" ? "All" : value === "active" ? "Active" : "Archived"}
                active={filter === value}
                onClick={() => setFilter(value)}
              />
            ))}
          </div>
        </LayoutGroup>
      </motion.div>

      <div className="mt-10 space-y-10">
        {filtered.length === 0 ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center"
          >
            <motion.div
              animate={reduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
              transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/60 text-2xl dark:border-white/10 dark:bg-white/5"
            >
              *
            </motion.div>
            <h3 className="font-display text-xl text-slate-900 dark:text-white">No signal detected</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-white/60">
              Try another keyword or reset the filter.
            </p>
          </motion.div>
        ) : (
          <>
            {filter === "all" ? (
              <>
                {activeProjects.length > 0 ? (
                  <ProjectGroup
                    title="Active"
                    items={activeProjects}
                    inView={inView}
                    roleLabel="Role"
                  />
                ) : null}
                {archivedProjects.length > 0 ? (
                  <ProjectGroup
                    title="Archived"
                    items={archivedProjects}
                    inView={inView}
                    roleLabel="Role"
                  />
                ) : null}
              </>
            ) : (
              <ProjectGroup
                title={filter === "active" ? "Active" : "Archived"}
                items={filtered}
                inView={inView}
                roleLabel="Role"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

type ProjectGroupProps = {
  title: string;
  items: typeof projects;
  inView: boolean;
  roleLabel: string;
};

function ProjectGroup({ title, items, inView, roleLabel }: ProjectGroupProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div>
      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">
        <span className="h-px w-10 bg-slate-200/70 dark:bg-white/10" />
        {title}
      </div>
      <motion.div
        variants={staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        animate={inView ? "show" : "hidden"}
        className="grid gap-6 md:grid-cols-2"
      >
        {items.map((project) => (
          <motion.div key={project.id} variants={fadeUp}>
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-slate-900 dark:text-white">{project.title}</h3>
                  {project.role ? (
                    <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                      {roleLabel}: {project.role}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-white/70">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-white/50">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-slate-900 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
