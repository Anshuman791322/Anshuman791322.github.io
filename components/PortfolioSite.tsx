"use client";

import Image from "next/image";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { portfolio, type Project } from "@/data/portfolio";
import { reveal, stagger, staggerTight } from "@/lib/motion";
import portraitImage from "@/public/portrait.jpg";
import { useLenis } from "@/hooks/useLenis";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { CountUp } from "@/components/ui/CountUp";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { IntroSplash } from "@/components/ui/IntroSplash";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ProjectCard } from "@/components/sections/ProjectCard";

const orbitChips = ["Local AI", "Vision", "Research", "Web"] as const;

export function PortfolioSite() {
  const reducedMotion = useReducedMotion();
  const activeSection = useScrollSpy(portfolio.nav, "about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useLenis(Boolean(reducedMotion));

  // Mouse-follow spotlight inside hero (desktop only; hook is cheap on touch too).
  function handleHeroMouse(event: ReactMouseEvent<HTMLElement>) {
    if (reducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty("--mx", `${mx}%`);
    heroRef.current.style.setProperty("--my", `${my}%`);
  }

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <LazyMotion features={domAnimation}>
      <IntroSplash />
      <CustomCursor />
      <AmbientOrbs />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="site-shell">
        <div className="ambient-grid" aria-hidden="true" />

        {/* ============ Header ============ */}
        <header className="site-header">
          <a href="#about" className="brand" aria-label="Anshuman Singh home">
            <span className="brand-glyph">AS</span>
            <span className="brand-name">
              {portfolio.person.name}
              <span className="brand-name-sub">{portfolio.person.role}</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {portfolio.nav.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={activeSection === item ? "active" : ""}
                data-cursor
              >
                {activeSection === item && (
                  <m.span
                    layoutId="active-nav"
                    className="nav-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item}</span>
              </a>
            ))}
          </nav>
          <Magnetic>
            <a
              href="#contact"
              className="nav-cta"
              data-cursor
              aria-label="Jump to contact section"
            >
              Let&apos;s talk <ArrowUpRight size={14} />
            </a>
          </Magnetic>
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <AnimatePresence>
            {menuOpen && (
              <m.nav
                className="mobile-nav"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                aria-label="Mobile navigation"
              >
                {portfolio.nav.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--orange-soft)" }}
                >
                  Let&apos;s talk
                </a>
              </m.nav>
            )}
          </AnimatePresence>
        </header>

        <main>
          {/* ============ Hero ============ */}
          <section
            className="hero section"
            id="about"
            ref={heroRef}
            onMouseMove={handleHeroMouse}
          >
            <div className="spotlight" aria-hidden="true" />
            <m.div
              className="hero-copy"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <m.p className="eyebrow" variants={reveal}>
                <span className="status-dot" /> {portfolio.person.availability}
              </m.p>
              <m.h1 variants={reveal}>
                I turn technical ideas into{" "}
                <span className="accent-text">working products.</span>
              </m.h1>
              <m.p className="hero-summary" variants={reveal}>
                {portfolio.person.bio}
              </m.p>
              <m.div className="hero-actions" variants={reveal}>
                <Magnetic>
                  <a className="button primary-button" href="#projects" data-cursor>
                    Explore work <ArrowDown size={17} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    className="button secondary-button"
                    href={portfolio.person.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                  >
                    <Github size={18} /> GitHub
                  </a>
                </Magnetic>
              </m.div>
              <m.div className="hero-meta" variants={reveal}>
                <span>
                  <strong>Based · </strong>
                  {portfolio.person.location}
                </span>
                <span>
                  <strong>Stack · </strong>Python · TypeScript · React
                </span>
                <span>
                  <strong>Focus · </strong>Local-first AI · Vision · Web
                </span>
              </m.div>
            </m.div>

            <m.div
              className="identity-stage"
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <m.div
                className="identity-ring ring-one"
                aria-hidden="true"
                animate={reducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <m.div
                className="identity-ring ring-two"
                aria-hidden="true"
                animate={reducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              />
              <m.div
                className="identity-card"
                whileHover={reducedMotion ? undefined : { rotateY: -3, rotateX: 3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="portrait-wrap">
                  <Image
                    src={portraitImage}
                    alt={portfolio.person.name}
                    fill
                    priority
                    sizes="(max-width: 800px) 78vw, 380px"
                    className="portrait"
                  />
                </div>
                <div className="identity-meta">
                  <div>
                    <p>{portfolio.person.name}</p>
                    <span>Computer Science Engineering</span>
                  </div>
                  <Sparkles size={22} />
                </div>
              </m.div>
              {orbitChips.map((chip, index) => (
                <m.span
                  key={chip}
                  className={`orbit-chip chip-${index + 1}`}
                  initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <m.span
                    style={{ display: "inline-flex", alignItems: "center" }}
                    animate={
                      reducedMotion
                        ? undefined
                        : { y: [0, index % 2 ? -8 : 8, 0] }
                    }
                    transition={{
                      duration: 4 + index * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="chip-dot" />
                    {chip}
                  </m.span>
                </m.span>
              ))}
            </m.div>
          </section>

          {/* ============ Stats strip ============ */}
          <m.section
            className="stats-strip"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerTight}
            aria-label="Portfolio statistics"
          >
            {portfolio.stats.map((stat) => (
              <m.div key={stat.label} variants={reveal}>
                <strong>
                  <CountUp to={stat.value} />
                  {"suffix" in stat && stat.suffix ? (
                    <span className="stat-suffix">{stat.suffix}</span>
                  ) : null}
                </strong>
                <span>{stat.label}</span>
              </m.div>
            ))}
          </m.section>

          <SectionDivider id="hero-about" />

          {/* ============ About ============ */}
          <section className="section about-band">
            <m.div
              className="section-heading split-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <m.p className="eyebrow" variants={reveal}>
                01 / About
              </m.p>
              <m.h2 variants={reveal}>Curiosity, shipped.</m.h2>
              <m.p variants={reveal}>
                I treat ideas as products from day one — design, build, package,
                publish. The four principles below shape every repo on this site.
              </m.p>
            </m.div>
            <m.div
              className="principles"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={stagger}
            >
              {[
                {
                  num: "01",
                  title: "Local-first AI",
                  body: "Tools that keep inference and interaction close to the user.",
                },
                {
                  num: "02",
                  title: "Applied research",
                  body: "Classification work grounded in notebooks and observable data.",
                },
                {
                  num: "03",
                  title: "Real distribution",
                  body: "From interface to a public release channel people can actually access.",
                },
                {
                  num: "04",
                  title: "Crafted surfaces",
                  body: "Motion and detail held to a higher bar than the brief demands.",
                },
              ].map((principle) => (
                <m.div
                  key={principle.num}
                  className="principle-card"
                  variants={reveal}
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                >
                  <span>{principle.num}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </m.div>
              ))}
            </m.div>
          </section>

          <SectionDivider id="about-journey" />

          {/* ============ Timeline ============ */}
          <section className="section journey-section" id="journey">
            <div className="section-heading">
              <p className="eyebrow">02 / Journey</p>
              <h2>A public build history.</h2>
              <p>
                Five years of public commits across local AI, computer vision,
                applied research, and front-end. Each milestone maps to a
                repository that is still online.
              </p>
            </div>
            <div className="timeline">
              <m.svg
                className="timeline-line"
                viewBox="0 0 4 800"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="timelineGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.85" />
                    <stop offset="55%" stopColor="#4A90FF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#4A90FF" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <m.path
                  d="M2 0V800"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reducedMotion ? 0 : 1.8, ease: "easeOut" }}
                />
              </m.svg>
              {portfolio.timeline.map((item, index) => (
                <m.article
                  key={`${item.year}-${item.title}`}
                  className="timeline-item"
                  initial={{
                    opacity: 0,
                    x: reducedMotion ? 0 : index % 2 ? 24 : -24,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-card">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    {item.meta && <span className="timeline-meta">{item.meta}</span>}
                  </div>
                </m.article>
              ))}
            </div>
          </section>

          <SectionDivider id="journey-skills" />

          {/* ============ Skills ============ */}
          <section className="section skills-section" id="skills">
            <div className="section-heading">
              <p className="eyebrow">03 / Capabilities</p>
              <h2>Tools selected for the problem.</h2>
              <p>
                A grouped view of the technology I reach for — picked because
                they shipped, not because they were trending.
              </p>
            </div>
            <m.div
              className="skill-groups"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={stagger}
            >
              {portfolio.skills.map((group) => (
                <m.div
                  key={group.label}
                  className="skill-group"
                  variants={reveal}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                >
                  <span className="skill-group-label">{group.label}</span>
                  <div className="skill-group-list">
                    {group.items.map((item) => (
                      <Magnetic key={item} strength={0.12}>
                        <span className="skill-chip" tabIndex={0} data-cursor>
                          {item}
                        </span>
                      </Magnetic>
                    ))}
                  </div>
                </m.div>
              ))}
            </m.div>
          </section>

          <SectionDivider id="skills-projects" />

          {/* ============ Projects Bento ============ */}
          <section className="section projects-section" id="projects">
            <div className="section-heading project-heading">
              <div>
                <p className="eyebrow">04 / Public work</p>
                <h2>Every repository, in one place.</h2>
              </div>
              <p>
                All {portfolio.projects.length} public repositories currently on
                GitHub, ordered by significance and recency. Click any card for
                the full story.
              </p>
            </div>
            <m.div
              className="projects-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={stagger}
            >
              {portfolio.projects.map((project, index) => (
                <ProjectCard
                  key={project.repository}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              ))}
            </m.div>
            <Magnetic strength={0.1}>
              <a
                className="all-repos-link"
                href={`${portfolio.person.github}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                View all repositories on GitHub <ArrowUpRight size={17} />
              </a>
            </Magnetic>
          </section>

          <SectionDivider id="projects-experiments" />

          {/* ============ Experiments rail ============ */}
          <section className="section experiments" id="experiments">
            <div className="section-heading">
              <p className="eyebrow">05 / Experiments</p>
              <h2>Notes from the workbench.</h2>
              <p>
                Smaller threads I&apos;m pulling on between releases —
                self-imposed prompts that turn into something shipping later.
              </p>
            </div>
            <m.div
              className="experiments-rail"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerTight}
            >
              {portfolio.experiments.map((experiment) => (
                <m.div
                  key={experiment.label}
                  className="experiment-row"
                  variants={reveal}
                  data-cursor
                >
                  <div>
                    <strong>{experiment.label}</strong>
                    <span>{experiment.detail}</span>
                  </div>
                  <ArrowUpRight size={18} />
                </m.div>
              ))}
            </m.div>
          </section>

          <SectionDivider id="experiments-contact" />

          {/* ============ Contact ============ */}
          <section className="contact-section" id="contact">
            <m.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              className="contact-inner"
            >
              <p className="eyebrow">06 / Contact</p>
              <h2>
                Have a hard problem <span className="accent-text">worth building?</span>
              </h2>
              <p>
                I&apos;m open to software roles, research collaborations, and
                product engineering work — especially anything that puts
                local-first AI, computer vision, or considered front-end in
                front of a real user.
              </p>
              <div className="hero-actions">
                <Magnetic>
                  <a
                    className="button primary-button"
                    href={`mailto:${portfolio.person.email}`}
                    data-cursor
                  >
                    <Mail size={18} /> Email me
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    className="button secondary-button"
                    href={portfolio.person.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                  >
                    <Github size={18} /> GitHub
                  </a>
                </Magnetic>
              </div>
              <div className="contact-meta">
                <span>
                  Email ·{" "}
                  <a href={`mailto:${portfolio.person.email}`}>
                    {portfolio.person.email}
                  </a>
                </span>
                <span>
                  GitHub ·{" "}
                  <a
                    href={portfolio.person.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{portfolio.person.handle}
                  </a>
                </span>
                <span>Based · {portfolio.person.location}</span>
              </div>
            </m.div>
          </section>
        </main>

        <footer>
          <span>© {new Date().getFullYear()} {portfolio.person.name}</span>
          <div className="footer-links">
            <a
              href={portfolio.person.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              GitHub
            </a>
            <a href={`mailto:${portfolio.person.email}`} data-cursor>
              Email
            </a>
            <a href="#about" data-cursor>
              Back to top
            </a>
          </div>
          <span>Designed and built with intent.</span>
        </footer>
      </div>

      {/* ============ Project modal ============ */}
      <AnimatePresence>
        {selectedProject && (
          <m.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <m.article
              layoutId={`project-${selectedProject.title}`}
              className={`project-modal project-${selectedProject.accent}`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <button
                type="button"
                className="modal-close icon-button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
              <span className="eyebrow">
                {selectedProject.year} /{" "}
                {selectedProject.archived ? "Archived" : "Public repository"}
              </span>
              <m.h2
                id="project-modal-title"
                layoutId={`project-title-${selectedProject.title}`}
              >
                {selectedProject.title}
              </m.h2>
              <p>{selectedProject.description}</p>
              <p className="impact">{selectedProject.impact}</p>
              <p className="project-role">Role · {selectedProject.role}</p>
              <div className="tag-list">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="hero-actions">
                <a
                  className="button primary-button"
                  href={selectedProject.repository}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={18} /> Open source
                </a>
                {selectedProject.liveUrl && (
                  <a
                    className="button secondary-button"
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open live <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </m.article>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
