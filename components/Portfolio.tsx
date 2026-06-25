"use client";

import { useEffect } from "react";

const REVEAL_STYLE = `
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spinrev{to{transform:rotate(-360deg)}}
@keyframes blobFloat{0%{transform:translate(0,0)}50%{transform:translate(24px,-30px)}100%{transform:translate(0,0)}}
@keyframes blobFloat2{0%{transform:translate(0,0)}50%{transform:translate(-30px,24px)}100%{transform:translate(0,0)}}
@keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes hueShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes bars{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}

.p-root{background:#070B12;color:#E5E7EB;font-family:'Inter Tight',ui-sans-serif,system-ui,sans-serif;font-weight:400;overflow-x:hidden;min-height:100vh;position:relative}
.p-root *{box-sizing:border-box}
.p-root ::selection{background:#38BDF8;color:#070B12}

.p-root [data-reveal]{opacity:0;transform:translateY(40px)}
.p-root [data-reveal="pop"]{transform:translateY(26px) scale(.975)}
.p-root [data-reveal][data-shown]{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.p-root [data-reveal]{opacity:1!important;transform:none!important}}

.p-nav-link{text-decoration:none;color:#94A3B8;font-size:14.5px;transition:color .2s}
.p-nav-link:hover{color:#E5E7EB}
.p-btn-ghost{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(148,163,184,0.3);color:#E5E7EB;border-radius:100px;text-decoration:none;transition:border-color .2s,background .2s}
.p-btn-ghost:hover{border-color:rgba(148,163,184,0.55);background:rgba(148,163,184,0.08)}
.p-btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(140deg,#38BDF8,#0ea5e9);color:#070B12;border-radius:100px;font-weight:600;text-decoration:none;box-shadow:0 8px 30px rgba(56,189,248,0.25);transition:transform .2s,box-shadow .2s}
.p-btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 38px rgba(56,189,248,0.4)}
.p-card{transition:transform .3s,border-color .25s}
.p-card.accent-cyan:hover{transform:translateY(-5px);border-color:#38BDF8}
.p-card.accent-amber:hover{transform:translateY(-5px);border-color:#F59E0B}
.p-card.accent-violet:hover{transform:translateY(-5px);border-color:#A78BFA}
.p-card.accent-green:hover{transform:translateY(-5px);border-color:#22C55E}

@media (max-width:880px){
  .p-hero-grid{grid-template-columns:1fr!important}
  .p-about-grid{grid-template-columns:1fr!important}
  .p-proj-card{grid-template-columns:1fr!important}
  .p-nav-links{display:none!important}
}
`;

const ORBIT_LABELS = [
  { text: "Local AI", accent: "#38BDF8" },
  { text: "Computer Vision", accent: "#F59E0B" },
  { text: "ML Research", accent: "#A78BFA" },
  { text: "Frontend Systems", accent: "#38BDF8" },
  { text: "Android Releases", accent: "#22C55E" },
  { text: "Open Source", accent: "#A78BFA" },
];

const SNAPSHOT = [
  { name: "Local AI Assistant", label: "Desktop AI", status: "Active", accent: "#38BDF8" },
  { name: "Driver Monitoring", label: "Computer Vision Release", status: "Release Hub", accent: "#F59E0B" },
  { name: "Variable Star Classifier", label: "Applied ML Research", status: "Notebook", accent: "#A78BFA" },
  { name: "Portfolio System", label: "Frontend / Static Export", status: "Live", accent: "#22C55E" },
];

const ABOUT_CARDS = [
  { k: "Education", v: "B.Tech Computer Science Engineering" },
  { k: "Focus", v: "AI, Computer Vision, ML, Frontend Systems" },
  { k: "Current Direction", v: "Local-first AI tools and product-ready project interfaces" },
];

const ECOSYSTEM = [
  { name: "Jarvis Local AI Assistant", text: "Local desktop assistant with voice input, memory, and local model inference.", metric: "Local-first AI", accent: "#38BDF8", glyph: "◆" },
  { name: "Smart Driver Monitoring", text: "Release hub for a computer-vision driver-safety Android app.", metric: "Computer vision", accent: "#F59E0B", glyph: "▣" },
  { name: "Variable Star Classifier", text: "Notebook-driven ML classifier for periodic variable stars.", metric: "Research ML", accent: "#A78BFA", glyph: "✦" },
  { name: "Portfolio System", text: "Static Next.js portfolio built as a product surface.", metric: "Frontend system", accent: "#38BDF8", glyph: "❏" },
];

const STACK = [
  { cat: "Languages", items: ["Python", "TypeScript", "C++", "HTML/CSS"], accent: "#38BDF8" },
  { cat: "AI & ML", items: ["Ollama", "Whisper", "PyTorch", "scikit-learn", "Jupyter"], accent: "#22C55E" },
  { cat: "Apps & Web", items: ["Next.js", "React", "PySide6", "Anime.js", "GitHub Pages"], accent: "#A78BFA" },
  { cat: "Delivery", items: ["GitHub", "GitHub Actions", "APK releases", "Static export", "Docs"], accent: "#F59E0B" },
];

const TIMELINE = [
  { year: "2026", title: "Local-first AI desktop product", text: "Designed a Windows-first Jarvis-style assistant with PySide6, local Ollama inference, voice transcription, memory, and safer bounded autonomy.", accent: "#38BDF8" },
  { year: "2026", title: "Driver-safety release channel", text: "Built the public APK distribution surface for a Smart Driver Monitoring Dashboard, turning a computer-vision app into a shareable release.", accent: "#F59E0B" },
  { year: "2025", title: "Applied research — variable stars", text: "Created a notebook-driven classifier for periodically variable stars using astronomical data, feature engineering, and classical machine-learning workflows.", accent: "#A78BFA" },
  { year: "2024", title: "Frontend foundations", text: "Built the first version of a public HTML portfolio while learning layout, typography, responsive design, and web fundamentals.", accent: "#22C55E" },
];

const COLLABS = [
  { name: "Zinging", owner: "Lakshay-13", text: "A Python Discord bot with assistant workflows, database-backed memory, caching, and deployment readiness.", credit: "Built by Lakshay-13 · included with permission", role: "Showcased with permission", link: "https://github.com/Lakshay-13", accent: "#A78BFA" },
  { name: "ArtGridX", owner: "Lakshay-13", text: "A masonry-style collage portfolio with parallax hero, draggable cards, animated lightbox, and an admin dashboard.", credit: "Built by Lakshay-13 · included with permission", role: "Showcased with permission", link: "https://github.com/Lakshay-13", accent: "#F59E0B" },
];

function accentClass(hex: string): string {
  switch (hex) {
    case "#38BDF8": return "p-card accent-cyan";
    case "#F59E0B": return "p-card accent-amber";
    case "#A78BFA": return "p-card accent-violet";
    case "#22C55E": return "p-card accent-green";
    default: return "p-card";
  }
}

export function Portfolio() {
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bar = document.createElement("div");
    bar.style.cssText = "position:fixed;top:0;left:0;height:2px;width:100%;transform:scaleX(0);transform-origin:0 50%;background:linear-gradient(90deg,#38BDF8,#A78BFA);z-index:70;pointer-events:none;will-change:transform";
    document.body.appendChild(bar);

    let sraf = 0;
    const applyScroll = () => {
      sraf = 0;
      const se = document.scrollingElement || document.documentElement;
      const max = se.scrollHeight - se.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, se.scrollTop / max) : 0})`;
    };
    const onScroll = () => { if (!sraf) sraf = requestAnimationFrame(applyScroll); };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyScroll();

    let spot: HTMLDivElement | null = null;
    let onMove: ((e: MouseEvent) => void) | null = null;
    if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
      spot = document.createElement("div");
      spot.style.cssText = "position:fixed;top:0;left:0;width:760px;height:760px;margin:-380px 0 0 -380px;pointer-events:none;z-index:45;opacity:0;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,0.09),transparent 62%);transition:opacity .5s ease;will-change:transform";
      document.body.appendChild(spot);
      let mx = 0, my = 0, mraf = 0;
      const applyMouse = () => { mraf = 0; spot!.style.opacity = "1"; spot!.style.transform = `translate(${mx}px,${my}px)`; };
      onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (!mraf) mraf = requestAnimationFrame(applyMouse); };
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const beginReveal = (e: HTMLElement) => {
      e.setAttribute("data-shown", "");
      if (prefersReduced) { e.style.opacity = ""; e.style.transform = ""; return; }
      const pop = e.getAttribute("data-reveal") === "pop";
      const dur = pop ? 760 : 860;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const k = ease(p);
        e.style.setProperty("opacity", String(k), "important");
        if (pop) e.style.setProperty("transform", `translateY(${(1 - k) * 26}px) scale(${0.975 + 0.025 * k})`, "important");
        else e.style.setProperty("transform", `translateY(${(1 - k) * 40}px)`, "important");
        if (p < 1) requestAnimationFrame(tick);
        else { e.style.removeProperty("opacity"); e.style.removeProperty("transform"); }
      };
      requestAnimationFrame(tick);
    };
    const revealed = new WeakSet<HTMLElement>();
    const show = (e: HTMLElement, delay: number) => {
      if (revealed.has(e)) return;
      revealed.add(e);
      if (delay > 0) setTimeout(() => beginReveal(e), delay);
      else beginReveal(e);
    };

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        let n = 0;
        entries.forEach((en) => {
          if (en.isIntersecting) { show(en.target as HTMLElement, n * 80); n++; io!.unobserve(en.target); }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
      els.forEach((e) => io!.observe(e));
    } else {
      els.forEach((e, i) => show(e, Math.min(i * 55, 1400)));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (io) io.disconnect();
      bar.remove();
      if (spot) spot.remove();
    };
  }, []);

  const orbitChips = ORBIT_LABELS.map((l, i) => {
    const theta = ((-90 + i * 60) * Math.PI) / 180;
    const x = 50 + 47 * Math.cos(theta);
    const y = 50 + 47 * Math.sin(theta);
    return { ...l, x, y };
  });

  return (
    <>
      <style>{REVEAL_STYLE}</style>
      <div id="top" className="p-root">

        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "15px clamp(18px,5vw,40px)", background: "rgba(7,11,18,0.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(148,163,184,0.18)" }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#E5E7EB" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 9, background: "linear-gradient(140deg,#38BDF8,#A78BFA)", color: "#070B12", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 13 }}>AS</span>
            <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 15.5, letterSpacing: "-0.01em" }}>Anshuman Singh</span>
          </a>
          <div className="p-nav-links" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <a className="p-nav-link" href="#about">About</a>
            <a className="p-nav-link" href="#ecosystem">Ecosystem</a>
            <a className="p-nav-link" href="#projects">Projects</a>
            <a className="p-nav-link" href="#stack">Stack</a>
            <a className="p-nav-link" href="#timeline">Timeline</a>
            <a className="p-nav-link" href="#contact">Contact</a>
          </div>
          <a className="p-btn-ghost" href="https://github.com/Anshuman791322" target="_blank" rel="noopener noreferrer" style={{ padding: "8px 15px", fontSize: 13.5 }}>GitHub <span style={{ color: "#38BDF8" }}>↗</span></a>
        </nav>

        {/* HERO */}
        <section style={{ position: "relative", overflow: "hidden", padding: "148px clamp(18px,5vw,40px) 40px" }}>
          <div style={{ position: "absolute", top: 60, left: "-4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,#38BDF8,transparent 68%)", filter: "blur(90px)", opacity: 0.18, animation: "blobFloat 14s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 180, right: "-4%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#A78BFA,transparent 68%)", filter: "blur(94px)", opacity: 0.16, animation: "blobFloat2 17s ease-in-out infinite", pointerEvents: "none" }} />
          <div className="p-hero-grid" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 48, alignItems: "center" }}>
            <div>
              <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.04em", color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "6px 13px", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulseDot 2s infinite" }} />B.Tech CSE · building in public
              </div>
              <h1 data-reveal style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(36px,5.6vw,68px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "#E5E7EB" }}>
                I build practical <span style={{ background: "linear-gradient(120deg,#38BDF8,#7dd3fc)", backgroundSize: "200% 200%", animation: "hueShift 7s ease-in-out infinite", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>AI</span>, <span style={{ background: "linear-gradient(120deg,#22C55E,#86efac)", backgroundSize: "200% 200%", animation: "hueShift 8s ease-in-out infinite", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>computer-vision</span>, and <span style={{ background: "linear-gradient(120deg,#A78BFA,#d8b4fe)", backgroundSize: "200% 200%", animation: "hueShift 9s ease-in-out infinite", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>web products</span>.
              </h1>
              <p data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.45, color: "#cbd5e1", marginTop: 20, maxWidth: 560 }}>B.Tech Computer Science student focused on local-first AI, computer-vision systems, applied machine learning, and polished front-end interfaces.</p>
              <p data-reveal style={{ fontSize: 16, lineHeight: 1.55, color: "#94A3B8", marginTop: 16, maxWidth: 560 }}>I turn academic and personal projects into usable software: desktop assistants with local inference, Android release pages for computer-vision apps, reproducible ML notebooks, and portfolio systems that are fast, visual, and open source.</p>
              <div data-reveal style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                <a className="p-btn-primary" href="#projects" style={{ padding: "13px 22px", fontSize: 15 }}>View Projects →</a>
                <a className="p-btn-ghost" href="https://github.com/Anshuman791322" target="_blank" rel="noopener noreferrer" style={{ padding: "13px 22px", fontSize: 15 }}>Open GitHub</a>
                <a className="p-btn-ghost" href="mailto:anshuman6062@gmail.com" style={{ padding: "13px 22px", fontSize: 15 }}>Contact Me</a>
              </div>
            </div>
            <div data-reveal="pop" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "clamp(280px,36vw,430px)", aspectRatio: "1" }}>
                <div style={{ position: "absolute", inset: "5%", border: "1px solid rgba(148,163,184,0.14)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: "21%", border: "1px dashed rgba(148,163,184,0.13)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.22),rgba(167,139,250,0.12),transparent 72%)", filter: "blur(6px)" }} />
                <div style={{ position: "absolute", inset: "31%", borderRadius: "50%", background: "linear-gradient(160deg,#0F172A,#111827)", border: "1px solid rgba(148,163,184,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 50px rgba(56,189,248,0.16)" }}>
                  <div style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(30px,5vw,46px)", fontWeight: 700, letterSpacing: "-0.02em", background: "linear-gradient(125deg,#38BDF8,#A78BFA)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>AS</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: "0.12em", color: "#94A3B8", marginTop: 5 }}>ANSHUMAN SINGH</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulseDot 2s infinite" }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#22C55E" }}>available</span>
                  </div>
                </div>
                <div style={{ position: "absolute", inset: 0, animation: "spin 50s linear infinite" }}>
                  {orbitChips.map((chip, i) => (
                    <div key={i} style={{ position: "absolute", left: `${chip.x}%`, top: `${chip.y}%`, transform: "translate(-50%,-50%)" }}>
                      <div style={{ animation: "spinrev 50s linear infinite" }}>
                        <span style={{ display: "inline-block", whiteSpace: "nowrap", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#cbd5e1", background: "rgba(15,23,42,0.92)", border: `1px solid ${chip.accent}`, borderRadius: 100, padding: "5px 11px", boxShadow: `0 0 18px ${chip.accent}33` }}>{chip.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SNAPSHOT */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px clamp(18px,5vw,40px) 0" }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 18 }}>{"// Selected public work"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {SNAPSHOT.map((s, i) => (
              <div key={i} className={accentClass(s.accent)} data-reveal="pop" style={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 14, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.04em", color: "#94A3B8" }}>{s.label}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: s.accent }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.accent }} />{s.status}
                  </span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 500, color: "#E5E7EB" }}>{s.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div className="p-about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#38BDF8", marginBottom: 16 }}>{"// About me"}</div>
              <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB" }}>Turning repositories into products people can open, inspect, and run.</h2>
            </div>
            <div>
              <p data-reveal style={{ fontSize: 17, lineHeight: 1.6, color: "#94A3B8" }}>I am a B.Tech Computer Science Engineering student building projects across AI, computer vision, applied machine learning, and web interfaces. I like turning repos into usable products: clear interfaces, readable documentation, release paths, and project pages that people can actually open, inspect, and run.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                {ABOUT_CARDS.map((c, i) => (
                  <div key={i} data-reveal style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 12, padding: "15px 17px", display: "flex", gap: 14, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.04em", color: "#38BDF8", minWidth: 120, textTransform: "uppercase" }}>{c.k}</span>
                    <span style={{ fontSize: 15, color: "#E5E7EB", lineHeight: 1.4 }}>{c.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section id="ecosystem" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#22C55E", marginBottom: 16 }}>{"// Live project ecosystem"}</div>
          <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB", maxWidth: 720 }}>Live project ecosystem</h2>
          <p data-reveal style={{ fontSize: 17, color: "#94A3B8", marginTop: 14, maxWidth: 640, lineHeight: 1.5 }}>A snapshot of the systems, experiments, and interfaces I am building.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16, marginTop: 36 }}>
            {ECOSYSTEM.map((e, i) => (
              <div key={i} className={accentClass(e.accent)} data-reveal="pop" style={{ position: "relative", background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 16, padding: 22, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", filter: "blur(40px)", opacity: 0.18, background: e.accent }} />
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 11, fontSize: 19, border: "1px solid rgba(148,163,184,0.2)", color: e.accent, background: `${e.accent}14` }}>{e.glyph}</div>
                <div style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 500, color: "#E5E7EB", marginTop: 16 }}>{e.name}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#94A3B8", marginTop: 8 }}>{e.text}</p>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.03em", marginTop: 14, paddingTop: 13, borderTop: "1px solid rgba(148,163,184,0.14)", color: e.accent }}>{e.metric}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#38BDF8", marginBottom: 16 }}>{"// Featured projects"}</div>
          <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB", maxWidth: 760 }}>Featured projects</h2>
          <p data-reveal style={{ fontSize: 17, color: "#94A3B8", marginTop: 14, maxWidth: 680, lineHeight: 1.5 }}>Product surfaces first, repositories second. Each project is presented with context, role, tech stack, and a clear build path.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>

            {/* Jarvis */}
            <article className="p-proj-card" data-reveal="pop" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 0, background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 18, overflow: "hidden" }}>
              <div style={{ padding: "30px clamp(20px,2.6vw,34px)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#38BDF8", border: "1px solid rgba(56,189,248,0.4)", borderRadius: 100, padding: "4px 11px" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38BDF8", animation: "pulseDot 2.4s infinite" }} />Active</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8" }}>Desktop AI</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 25, fontWeight: 600, color: "#E5E7EB", letterSpacing: "-0.01em" }}>Jarvis Local AI Assistant</h3>
                <div style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: "#7dd3fc", marginTop: 6 }}>Windows desktop assistant with local LLM inference and voice control.</div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#94A3B8", marginTop: 14 }}>A Windows-first desktop assistant built with Python and PySide6. It uses Ollama for local reasoning, Whisper / faster-whisper for speech-to-text, SQLite for memory, and bounded autonomy rules for safer local actions. It reflects my interest in privacy-first AI tools that run on a user&apos;s own machine.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
                  {["Python", "PySide6", "Ollama", "Whisper", "SQLite"].map((t) => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "5px 11px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}><span style={{ color: "#94A3B8" }}>Role:</span> Solo build — design, engineering, local AI workflow</div>
                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 20 }}>
                  <a className="p-btn-ghost" href="https://github.com/Anshuman791322/Ai-agent" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 17px", fontSize: 13.5 }}>GitHub ↗</a>
                </div>
              </div>
              <div style={{ background: "linear-gradient(160deg,#0b1220,#0F172A)", borderLeft: "1px solid rgba(148,163,184,0.12)", padding: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 380, border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, overflow: "hidden", background: "#0a0f1a", boxShadow: "0 18px 50px rgba(0,0,0,0.4)" }} role="img" aria-label="Dark desktop interface for a local AI assistant with chat, voice input, and model status panels.">
                  <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", borderBottom: "1px solid rgba(148,163,184,0.14)", background: "#0b1220" }}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444" }} /><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b" }} /><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }} />
                    <span style={{ marginLeft: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "#64748b" }}>jarvis — local</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 0 }}>
                    <div style={{ padding: 13, display: "flex", flexDirection: "column", gap: 8, borderRight: "1px solid rgba(148,163,184,0.12)" }}>
                      <div style={{ alignSelf: "flex-start", maxWidth: "85%", background: "#111827", border: "1px solid rgba(148,163,184,0.14)", borderRadius: "9px 9px 9px 3px", padding: "8px 10px", fontSize: 11, color: "#cbd5e1" }}>Summarize today&apos;s notes</div>
                      <div style={{ alignSelf: "flex-end", maxWidth: "85%", background: "rgba(56,189,248,0.14)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "9px 9px 3px 9px", padding: "8px 10px", fontSize: 11, color: "#e0f2fe" }}>Running locally on llama3…</div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 24, marginTop: 4 }}>
                        {[0, 0.15, 0.3, 0.45, 0.6].map((d, i) => (
                          <span key={i} style={{ width: 3, background: "#38BDF8", borderRadius: 2, height: "100%", animation: "bars 1s ease-in-out infinite", animationDelay: `${d}s` }} />
                        ))}
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#38BDF8", marginLeft: 6 }}>listening</span>
                      </div>
                    </div>
                    <div style={{ padding: 13, display: "flex", flexDirection: "column", gap: 9 }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#22C55E", display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E" }} />model · llama3 ready</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#94A3B8" }}>memory · 128 notes</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#A78BFA", display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#A78BFA" }} />autonomy · bounded</div>
                      <div style={{ marginTop: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "#475569", border: "1px dashed rgba(148,163,184,0.2)", borderRadius: 7, padding: 7, textAlign: "center" }}>on-device · private</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Smart Driver */}
            <article className="p-proj-card" data-reveal="pop" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 0, background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 18, overflow: "hidden" }}>
              <div style={{ padding: "30px clamp(20px,2.6vw,34px)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#F59E0B", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 100, padding: "4px 11px" }}>Release Hub</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8" }}>Computer Vision</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 25, fontWeight: 600, color: "#E5E7EB", letterSpacing: "-0.01em" }}>Smart Driver Monitoring Release Hub</h3>
                <div style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: "#fbbf24", marginTop: 6 }}>Android APK release page for a computer-vision driver-safety system.</div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#94A3B8", marginTop: 14 }}>A release and download surface for a Smart Driver Monitoring Dashboard. The project focuses on making an Android computer-vision app easier to distribute, document, and test by providing public APK downloads and clear release information.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
                  {["Android", "APK", "Computer Vision", "Driver Safety", "Release Eng"].map((t) => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "5px 11px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}><span style={{ color: "#94A3B8" }}>Role:</span> Release engineering and public distribution</div>
                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 20, flexWrap: "wrap" }}>
                  <a className="p-btn-ghost" href="https://github.com/Anshuman791322/smart-driver-monitoring-dashboard-downloads" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 17px", fontSize: 13.5 }}>GitHub ↗</a>
                  <a href="https://github.com/Anshuman791322/smart-driver-monitoring-dashboard-downloads/releases" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(245,158,11,0.14)", border: "1px solid rgba(245,158,11,0.4)", color: "#fbbf24", borderRadius: 100, padding: "10px 17px", fontSize: 13.5, textDecoration: "none" }}>APK Releases ↓</a>
                </div>
              </div>
              <div style={{ background: "linear-gradient(160deg,#0b1220,#0F172A)", borderLeft: "1px solid rgba(148,163,184,0.12)", padding: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 172, border: "1px solid rgba(148,163,184,0.22)", borderRadius: 24, padding: "8px 8px 12px", background: "#0a0f1a", boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }} role="img" aria-label="Mobile dashboard mockup showing driver monitoring status cards and computer-vision indicators.">
                  <div style={{ display: "flex", justifyContent: "center", margin: "3px 0 8px" }}><span style={{ width: 46, height: 4, borderRadius: 100, background: "#1e293b" }} /></div>
                  <div style={{ position: "relative", height: 96, borderRadius: 12, background: "radial-gradient(circle at 50% 40%,#13233a,#0b1220)", overflow: "hidden", border: "1px solid rgba(148,163,184,0.14)" }}>
                    <svg viewBox="0 0 160 96" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                      <circle cx="80" cy="42" r="26" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                      <circle cx="71" cy="38" r="2.4" fill="#F59E0B" />
                      <circle cx="89" cy="38" r="2.4" fill="#F59E0B" />
                      <polyline points="76,48 80,52 84,48" fill="none" stroke="#F59E0B" strokeWidth="1.4" />
                      <line x1="80" y1="52" x2="80" y2="60" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
                      <line x1="40" y1="10" x2="120" y2="10" stroke="#22C55E" strokeWidth="1" opacity="0.35" />
                    </svg>
                    <span style={{ position: "absolute", top: 6, left: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: "#22C55E" }}>● live cam</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 9 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 8, padding: "7px 9px" }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#86efac" }}>Status</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#22C55E" }}>OK</span></div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.28)", borderRadius: 8, padding: "7px 9px" }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#fcd34d" }}>Drowsy</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#F59E0B" }}>0.12</span></div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "7px 9px" }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#fca5a5" }}>Distracted</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#ef4444" }}>0.04</span></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Variable Star */}
            <article className="p-proj-card" data-reveal="pop" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 0, background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 18, overflow: "hidden" }}>
              <div style={{ padding: "30px clamp(20px,2.6vw,34px)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#A78BFA", border: "1px solid rgba(167,139,250,0.4)", borderRadius: 100, padding: "4px 11px" }}>Research</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8" }}>Applied ML · Notebook</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 25, fontWeight: 600, color: "#E5E7EB", letterSpacing: "-0.01em" }}>Variable Star Classifier</h3>
                <div style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: "#c4b5fd", marginTop: 6 }}>Machine-learning notebook for classifying periodic variable stars.</div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#94A3B8", marginTop: 14 }}>A Jupyter Notebook project for classifying periodic variable stars into RR Lyrae, Cepheid, Long Period Variable, and Eclipsing Binary categories using astronomical data. It highlights applied machine learning, feature engineering, and reproducible research workflows.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
                  {["Python", "Jupyter", "scikit-learn", "Astronomy", "Gaia DR3"].map((t) => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "5px 11px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}><span style={{ color: "#94A3B8" }}>Role:</span> Research notebook / applied ML</div>
                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 20 }}>
                  <a className="p-btn-ghost" href="https://github.com/Anshuman791322/periodically-variable-stars" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 17px", fontSize: 13.5 }}>GitHub ↗</a>
                </div>
              </div>
              <div style={{ background: "linear-gradient(160deg,#0b1220,#0F172A)", borderLeft: "1px solid rgba(148,163,184,0.12)", padding: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 380, border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, overflow: "hidden", background: "#0a0f1a", boxShadow: "0 18px 50px rgba(0,0,0,0.4)" }} role="img" aria-label="Astronomy machine-learning visual with a star field, light curve, notebook cells, and variable star class labels.">
                  <div style={{ position: "relative", height: 104, background: "radial-gradient(1px 1px at 20% 30%,#fff,transparent),radial-gradient(1px 1px at 60% 60%,#cbd5e1,transparent),radial-gradient(1px 1px at 80% 25%,#fff,transparent),radial-gradient(1px 1px at 35% 75%,#a78bfa,transparent),radial-gradient(1px 1px at 75% 80%,#fff,transparent),linear-gradient(160deg,#0b1220,#10091f)", borderBottom: "1px solid rgba(148,163,184,0.14)" }}>
                    <svg viewBox="0 0 380 104" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                      <polyline points="10,70 40,40 70,72 100,38 130,70 160,40 190,72 220,40 250,70 280,42 310,70 340,40 370,68" fill="none" stroke="#A78BFA" strokeWidth="1.6" opacity="0.9" />
                    </svg>
                    <span style={{ position: "absolute", top: 7, left: 9, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#c4b5fd" }}>light curve · period 0.57d</span>
                  </div>
                  <div style={{ padding: "12px 13px", display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#64748b" }}>In[3]: clf.predict(features)</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#94A3B8" }}>Out[3]: [&apos;RR Lyrae&apos;]  acc 0.91</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.35)", borderRadius: 100, padding: "3px 8px" }}>RR Lyrae</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 100, padding: "3px 8px" }}>Cepheid</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 100, padding: "3px 8px" }}>LPV</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 100, padding: "3px 8px" }}>Eclipsing Binary</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Portfolio System */}
            <article className="p-proj-card" data-reveal="pop" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 0, background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 18, overflow: "hidden" }}>
              <div style={{ padding: "30px clamp(20px,2.6vw,34px)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#22C55E", border: "1px solid rgba(34,197,94,0.4)", borderRadius: 100, padding: "4px 11px" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulseDot 2.4s infinite" }} />Live</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8" }}>Frontend / Static Export</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 25, fontWeight: 600, color: "#E5E7EB", letterSpacing: "-0.01em" }}>Portfolio System</h3>
                <div style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: "#7dd3fc", marginTop: 6 }}>Next.js portfolio with static export, motion, and case-study pages.</div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#94A3B8", marginTop: 14 }}>A personal portfolio built as a product, not just a webpage. It uses Next.js, TypeScript, static export, self-hosted typography, motion components, and GitHub Pages deployment to present projects in a polished and inspectable way.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
                  {["Next.js", "TypeScript", "Anime.js", "GitHub Pages", "Static Export"].map((t) => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "5px 11px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}><span style={{ color: "#94A3B8" }}>Role:</span> Frontend design and engineering</div>
                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 20, flexWrap: "wrap" }}>
                  <a className="p-btn-ghost" href="https://github.com/Anshuman791322/Anshuman791322.github.io" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 17px", fontSize: 13.5 }}>GitHub ↗</a>
                  <a href="https://anshuman791322.github.io" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(56,189,248,0.14)", border: "1px solid rgba(56,189,248,0.4)", color: "#7dd3fc", borderRadius: 100, padding: "10px 17px", fontSize: 13.5, textDecoration: "none" }}>Live Site ↗</a>
                </div>
              </div>
              <div style={{ background: "linear-gradient(160deg,#0b1220,#0F172A)", borderLeft: "1px solid rgba(148,163,184,0.12)", padding: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 380, border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, overflow: "hidden", background: "#0a0f1a", boxShadow: "0 18px 50px rgba(0,0,0,0.4)" }} role="img" aria-label="Browser mockup of a dark personal portfolio with project cards and GitHub Pages deployment badge.">
                  <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", borderBottom: "1px solid rgba(148,163,184,0.14)", background: "#0b1220" }}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444" }} /><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b" }} /><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }} />
                    <span style={{ marginLeft: 6, flex: 1, background: "#111827", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#7dd3fc", padding: "3px 8px" }}>anshuman791322.github.io</span>
                  </div>
                  <div style={{ padding: 13, display: "grid", gridTemplateColumns: "1.3fr 1fr", gridAutoRows: "30px", gap: 7 }}>
                    <div style={{ gridRow: "span 2", background: "linear-gradient(150deg,rgba(56,189,248,0.16),rgba(167,139,250,0.1))", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 9 }}>
                      <div style={{ fontFamily: "'Space Grotesk'", fontSize: 11, color: "#E5E7EB", fontWeight: 600 }}>Anshuman</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, color: "#94A3B8", marginTop: 3 }}>builds AI · CV · web</div>
                    </div>
                    <div style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8 }} />
                    <div style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8 }} />
                    <div style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8 }} />
                    <div style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8 }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 13px 13px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 100, padding: "3px 8px" }}>● GitHub Pages · deployed</span>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* ARCHIVE */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 16 }}>{"// Early work and public history"}</div>
          <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(26px,3.4vw,36px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB" }}>Early work and public history</h2>
          <p data-reveal style={{ fontSize: 16, color: "#94A3B8", marginTop: 12, maxWidth: 600, lineHeight: 1.5 }}>Older repositories kept visible as part of my learning path.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginTop: 32 }}>

            <div data-reveal="pop" style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.22)", borderRadius: 100, padding: "3px 9px" }}>Archive</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "#64748b" }}>html-portfolio</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 19, fontWeight: 500, color: "#E5E7EB" }}>HTML/CSS Portfolio v1</h3>
                <div style={{ fontSize: 13.5, color: "#22C55E", marginTop: 4, fontFamily: "'Space Grotesk'" }}>Early handcrafted portfolio built with plain HTML and CSS.</div>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "#94A3B8", marginTop: 11 }}>My first portfolio experiment, built with basic web technologies — the starting point of my front-end learning before the structured Next.js portfolio system.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 13 }}>
                  {["HTML", "CSS", "Web Basics"].map((t) => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "4px 9px" }}>{t}</span>
                  ))}
                </div>
                <a className="p-btn-ghost" href="https://github.com/Anshuman791322/html-portfolio" target="_blank" rel="noopener noreferrer" style={{ marginTop: 15, padding: "8px 15px", fontSize: 13 }}>GitHub ↗</a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(148,163,184,0.12)" }} role="img" aria-label="Before and after comparison of a simple old portfolio page versus the new portfolio style.">
                <div style={{ padding: 13, borderRight: "1px solid rgba(148,163,184,0.12)", background: "#0b1220" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "#64748b", marginBottom: 7 }}>v1 · 2024</div>
                  <div style={{ height: 7, width: "60%", background: "#334155", borderRadius: 3, marginBottom: 5 }} />
                  <div style={{ height: 5, width: "90%", background: "#1e293b", borderRadius: 3, marginBottom: 4 }} />
                  <div style={{ height: 5, width: "80%", background: "#1e293b", borderRadius: 3 }} />
                </div>
                <div style={{ padding: 13, background: "linear-gradient(150deg,#0b1220,#10162a)" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "#22C55E", marginBottom: 7 }}>now</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    <div style={{ height: 18, background: "rgba(56,189,248,0.16)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 4 }} />
                    <div style={{ height: 18, background: "#111827", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal="pop" style={{ background: "#111827", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.22)", borderRadius: 100, padding: "3px 9px" }}>Archive</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "#64748b" }}>Anshuman-07</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 19, fontWeight: 500, color: "#E5E7EB" }}>GitHub Profile Config Archive</h3>
                <div style={{ fontSize: 13.5, color: "#94A3B8", marginTop: 4, fontFamily: "'Space Grotesk'" }}>Archived GitHub profile configuration from my early developer setup.</div>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "#94A3B8", marginTop: 11 }}>An archived profile/config repository kept for continuity. This is not a featured software project, but part of my public GitHub history.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 13 }}>
                  {["GitHub", "Config", "Archive"].map((t) => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 100, padding: "4px 9px" }}>{t}</span>
                  ))}
                </div>
                <a className="p-btn-ghost" href="https://github.com/Anshuman791322" target="_blank" rel="noopener noreferrer" style={{ marginTop: 15, padding: "8px 15px", fontSize: 13 }}>GitHub ↗</a>
              </div>
              <div style={{ padding: "16px 22px 20px", borderTop: "1px solid rgba(148,163,184,0.12)", background: "#0b1220" }} role="img" aria-label="Minimal GitHub profile archive card.">
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(140deg,#334155,#22C55E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk'", fontSize: 12, fontWeight: 600, color: "#070B12" }}>AS</span>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#E5E7EB" }}>Anshuman-07</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#64748b" }}>archived · read-only</div>
                  </div>
                  <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "#94A3B8", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 100, padding: "3px 8px" }}>archive</span>
                </div>
                <div style={{ display: "flex", gap: 3, marginTop: 13 }}>
                  {[1, 0.4, 0.7, 1, 0.5, 1, 0.3, 1].map((op, i) => {
                    const isDark = op === 1;
                    return <span key={i} style={{ width: 9, height: 9, borderRadius: 2, background: isDark ? "#1e293b" : "#22C55E", opacity: isDark ? 1 : op }} />;
                  })}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* COLLABS */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0" }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#A78BFA", marginBottom: 16 }}>{"// Featured collaborations"}</div>
          <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(26px,3.4vw,36px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB" }}>Featured collaborations</h2>
          <p data-reveal style={{ fontSize: 16, color: "#94A3B8", marginTop: 12, maxWidth: 640, lineHeight: 1.5 }}>Projects I am showcasing with clear credit. These are separate from my own repositories and remain the work of their authors.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, marginTop: 32 }}>
            {COLLABS.map((c, i) => (
              <div key={i} data-reveal="pop" style={{ position: "relative", background: "#0F172A", border: "1px dashed rgba(148,163,184,0.28)", borderRadius: 16, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: c.accent, background: `${c.accent}14`, border: `1px solid ${c.accent}55`, borderRadius: 100, padding: "4px 10px" }}>↳ Collaboration</span>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#94A3B8", textDecoration: "none" }}>{c.owner} ↗</a>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 600, color: "#E5E7EB" }}>{c.name}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#94A3B8", marginTop: 9 }}>{c.text}</p>
                <div style={{ marginTop: 14, paddingTop: 13, borderTop: "1px solid rgba(148,163,184,0.14)", display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#64748b" }}><span style={{ color: "#94A3B8" }}>credit ·</span> {c.credit}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#64748b" }}><span style={{ color: "#94A3B8" }}>my role ·</span> {c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="stack" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#38BDF8", marginBottom: 16 }}>{"// Stack"}</div>
          <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB", maxWidth: 720 }}>Stack I use to build, test, and ship</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginTop: 36 }}>
            {STACK.map((g, i) => (
              <div key={i} data-reveal="pop" style={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 16, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: g.accent }} />
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: g.accent }}>{g.cat}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {g.items.map((item) => (
                    <span key={item} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#cbd5e1", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, padding: "6px 11px" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div data-reveal style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#22C55E", marginBottom: 16 }}>{"// Build timeline"}</div>
          <h2 data-reveal style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, color: "#E5E7EB" }}>Build timeline</h2>
          <div style={{ marginTop: 36, position: "relative" }}>
            {TIMELINE.map((t, i) => (
              <div key={i} data-reveal style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 22, padding: "22px 0", borderTop: "1px solid rgba(148,163,184,0.14)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", marginTop: 7, flexShrink: 0, background: t.accent }} />
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 17, color: "#94A3B8" }}>{t.year}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 500, color: "#E5E7EB", letterSpacing: "-0.01em" }}>{t.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.5, color: "#94A3B8", marginTop: 7, maxWidth: 720 }}>{t.text}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(148,163,184,0.14)" }} />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px clamp(18px,5vw,40px) 0", scrollMarginTop: 88 }}>
          <div data-reveal="pop" style={{ position: "relative", background: "linear-gradient(160deg,#0F172A,#0b1220)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 24, padding: "clamp(28px,5vw,56px)", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.2),transparent 68%)", filter: "blur(70px)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,4.4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 600, color: "#E5E7EB", maxWidth: 760 }}>Have a project, role, or collaboration in mind?</h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "#94A3B8", marginTop: 18, maxWidth: 600 }}>I am open to software roles, internships, collaborations, and product engineering work where the implementation has to survive real use.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                <a className="p-btn-primary" href="mailto:anshuman6062@gmail.com" style={{ padding: "13px 24px", fontSize: 15 }}>Email Me →</a>
                <a className="p-btn-ghost" href="https://github.com/Anshuman791322" target="_blank" rel="noopener noreferrer" style={{ padding: "13px 24px", fontSize: 15 }}>GitHub ↗</a>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ maxWidth: 1200, margin: "80px auto 0", padding: "36px clamp(18px,5vw,40px) 56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", borderTop: "1px solid rgba(148,163,184,0.12)" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#64748b" }}>© 2026 Anshuman Singh · built in public</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#64748b" }}>local-first AI · computer vision · web</span>
        </footer>

      </div>
    </>
  );
}
