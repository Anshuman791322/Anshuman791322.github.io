import {
  Box,
  Code,
  Cpu,
  DirectboxNotif,
  Flash,
  Global,
  Image as ImageIcon,
  Message,
  Microscope,
} from "iconsax-react";
import { Github } from "lucide-react";
import Image from "next/image";

import { portfolio } from "@/data/portfolio";

const principles = [
  {
    title: "Local-first AI",
    body:
      "Tools that keep inference and interaction close to the user. No cloud round trip unless the product needs it.",
    icon: Flash,
  },
  {
    title: "Applied research",
    body:
      "Research work grounded in notebooks, visible data, and reproducible steps.",
    icon: Microscope,
  },
  {
    title: "Real distribution",
    body:
      "Software only matters when it reaches users and solves real problems.",
    icon: Global,
  },
  {
    title: "Crafted surfaces",
    body:
      "Interfaces shaped around motion, typography, and the details people actually feel.",
    icon: DirectboxNotif,
  },
];

const techGroups = [
  { label: "Languages", items: ["C++", "Python"], icon: Code },
  { label: "AI & ML", items: ["Ollama", "PyTorch"], icon: Cpu },
  { label: "Apps & Web", items: ["Next.js", "React"], icon: Box },
  { label: "Containers", items: ["GitHub", "Actions"], icon: DirectboxNotif },
];

const visualCards = [
  { label: "App studio", mark: "C", className: "studio-card" },
  { label: "Search", mark: "search", className: "search-card" },
  { label: "Product UI", image: "/apple-touch-icon.png", className: "image-card" },
  { label: "Development", image: "/favicon.png", className: "image-card" },
];

export default function Home() {
  const [agent, driver] = portfolio.projects;

  return (
    <main className="stitch-shell">
      <div className="stitch-glow stitch-glow-purple" aria-hidden="true" />
      <div className="stitch-glow stitch-glow-green" aria-hidden="true" />

      <section className="stitch-hero" id="about" aria-labelledby="hero-title">
        <h1 id="hero-title">
          I build software that feels
          <br />
          <em>considered, shipped,</em> and <em>alive.</em>
        </h1>
        <p>
          I&apos;m a B.Tech Computer Science student building five public
          products on GitHub.
        </p>
        <div className="stitch-actions">
          <a className="stitch-btn stitch-btn-primary" href="#selected-work">
            View selected work
          </a>
          <a className="stitch-btn stitch-btn-secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </section>

      <section className="stitch-stats" aria-label="Portfolio statistics">
        {portfolio.stats.map((stat) => (
          <article className="stitch-stat" key={stat.label}>
            <strong>
              {stat.value}
              {"suffix" in stat ? stat.suffix : ""}
            </strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="stitch-section" aria-labelledby="about-title">
        <p className="stitch-kicker">About</p>
        <h2 id="about-title">Curiosity, shipped.</h2>
        <div className="stitch-principles">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <article className="stitch-card stitch-principle" key={item.title}>
                <span className="stitch-icon">
                  <Icon size={18} variant="Linear" color="currentColor" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="stitch-section"
        id="selected-work"
        aria-labelledby="work-title"
      >
        <h2 id="work-title">Selected Work</h2>
        <div className="stitch-work-grid">
          <a className="stitch-work-card" href={agent.repository} target="_blank" rel="noreferrer">
            <div className="stitch-work-media">
              <ImageIcon size={32} variant="Linear" color="currentColor" />
              <span className="stitch-divider" />
            </div>
            <h3>{agent.title}</h3>
            <div className="stitch-tags">
              {agent.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>{agent.description}</p>
            <div className="stitch-code-tags">
              {agent.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </a>

          <a
            className="stitch-work-card stitch-work-card-featured"
            href={driver.repository}
            target="_blank"
            rel="noreferrer"
          >
            <div className="stitch-work-media">
              <ImageIcon size={32} variant="Linear" color="currentColor" />
              <span className="stitch-badge">Interactive →</span>
            </div>
            <h3>{driver.title}</h3>
            <div className="stitch-tags">
              {driver.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>{driver.description}</p>
            <div className="stitch-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </a>
        </div>
      </section>

      <section className="stitch-section" id="stack" aria-labelledby="stack-title">
        <h2 id="stack-title">Tech Stack</h2>
        <div className="stitch-tech-grid">
          {techGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article className="stitch-card stitch-tech-card" key={group.label}>
                <div className="stitch-card-head">
                  <span>{group.label}</span>
                  <i />
                </div>
                {group.items.map((item) => (
                  <div className="stitch-tech-item" key={item}>
                    <span>
                      <Icon size={13} variant="Linear" color="currentColor" />
                    </span>
                    {item}
                  </div>
                ))}
              </article>
            );
          })}

          {visualCards.map((card) => (
            <article className={`stitch-card stitch-visual-card ${card.className}`} key={card.label}>
              <div className="stitch-card-head">
                <span>{card.label}</span>
                <i />
              </div>
              <div className="stitch-visual-box">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={`${card.label} visual`}
                    width={512}
                    height={512}
                  />
                ) : card.mark === "search" ? (
                  <span className="stitch-search-mark" />
                ) : (
                  <span className="stitch-letter-mark">{card.mark}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-contact" id="contact" aria-labelledby="contact-title">
        <p className="stitch-kicker">Contact</p>
        <h2 id="contact-title">Have a hard problem?</h2>
        <p>Let&apos;s connect and talk through the build.</p>
        <div className="stitch-actions">
          <a className="stitch-btn stitch-btn-primary" href={`mailto:${portfolio.person.email}`}>
            <Message size={14} variant="Bold" color="currentColor" />
            Email
          </a>
          <a
            className="stitch-btn stitch-btn-dark"
            href={portfolio.person.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </section>

      <footer className="stitch-footer">
        © 2026 Crafted with curiosity. All rights reserved.
      </footer>
    </main>
  );
}
