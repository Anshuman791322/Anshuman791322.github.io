"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STYLES = `
.dc-root {
  --dc-bg: #070b12;
  --dc-panel: #0f172a;
  --dc-text: #e5e7eb;
  --dc-muted: #94a3b8;
  --dc-soft: #64748b;
  --dc-line: rgba(148, 163, 184, 0.18);
  --dc-blue: #38bdf8;
  --dc-green: #22c55e;
  --dc-violet: #a78bfa;
  --dc-amber: #f59e0b;
  --dc-teal: #2dd4bf;
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(700px 560px at 9% 12%, rgba(56, 189, 248, 0.14), transparent 68%),
    radial-gradient(760px 580px at 84% 18%, rgba(167, 139, 250, 0.13), transparent 70%),
    radial-gradient(620px 560px at 50% 88%, rgba(34, 197, 94, 0.08), transparent 72%),
    var(--dc-bg);
  color: var(--dc-text);
  font-family: var(--font-body), "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.01em;
}

.dc-root * { box-sizing: border-box; }
.dc-root ::selection { background: var(--dc-blue); color: var(--dc-bg); }

@media (pointer: fine) {
  .dc-root,
  .dc-root a,
  .dc-root button {
    cursor: none;
  }
}

.dc-starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.dc-cursor-dot,
.dc-cursor-trail {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 120;
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-100px, -100px, 0);
  transition: opacity 160ms ease, width 160ms ease, height 160ms ease, background 160ms ease;
}

.dc-cursor-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #e5e7eb;
  box-shadow: 0 0 10px rgba(125, 211, 252, 0.72);
}

.dc-cursor-trail {
  width: 28px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.9));
  transform-origin: 100% 50%;
}

.dc-cursor-dot.is-hovering {
  width: 12px;
  height: 12px;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.86);
}

.dc-progress {
  position: fixed;
  inset: 0 auto auto 0;
  z-index: 80;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--dc-blue), var(--dc-violet), var(--dc-green));
}

.dc-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 15px clamp(18px, 5vw, 40px);
  border-bottom: 1px solid var(--dc-line);
  background: rgba(7, 11, 18, 0.74);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.dc-brand,
.dc-nav-links,
.dc-socials,
.dc-actions,
.dc-tags,
.dc-project-actions {
  display: flex;
  align-items: center;
}

.dc-brand {
  gap: 10px;
  color: var(--dc-text);
  text-decoration: none;
}

.dc-logo {
  display: inline-grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 9px;
  background: linear-gradient(140deg, var(--dc-blue), var(--dc-violet));
  color: var(--dc-bg);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: 13px;
  font-weight: 800;
}

.dc-brand strong {
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: 15.5px;
  font-weight: 700;
}

.dc-nav-links {
  position: relative;
  gap: 26px;
  padding: 0 2px;
}

.dc-nav-links a {
  position: relative;
  z-index: 1;
  color: var(--dc-muted);
  font-size: 14.5px;
  padding: 8px 0;
  text-decoration: none;
  transition: color 180ms ease;
}

.dc-nav-links a:hover,
.dc-nav-links a:focus-visible,
.dc-nav-links a.is-active {
  color: var(--dc-text);
}

.dc-nav-indicator {
  position: absolute;
  left: 0;
  bottom: 2px;
  z-index: 0;
  width: 0;
  height: 2px;
  border-radius: 999px;
  background: var(--dc-blue);
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.72);
  opacity: 0;
  transform: translate3d(0, 0, 0);
}

.dc-shell {
  position: relative;
  z-index: 2;
  width: min(1200px, calc(100% - 36px));
  margin: 0 auto;
}

.dc-section {
  padding: 96px 0 0;
  scroll-margin-top: 88px;
}

.dc-hero {
  position: relative;
  display: grid;
  min-height: 100svh;
  grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
  gap: clamp(34px, 5vw, 64px);
  align-items: center;
  padding: 132px 0 44px;
}

.dc-orb {
  position: absolute;
  z-index: 0;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  pointer-events: none;
}

.dc-orb-one {
  top: 64px;
  left: -12%;
  background: radial-gradient(circle, var(--dc-blue), transparent 68%);
  animation: dc-float 14s ease-in-out infinite;
}

.dc-orb-two {
  right: -10%;
  top: 210px;
  background: radial-gradient(circle, var(--dc-violet), transparent 68%);
  animation: dc-float-alt 17s ease-in-out infinite;
}

.dc-hero-copy,
.dc-hero-orbit {
  position: relative;
  z-index: 1;
}

.dc-hero h1 {
  max-width: 760px;
  margin: 0;
  color: var(--dc-text);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: clamp(44px, 7.4vw, 92px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  text-wrap: balance;
}

.dc-hero-word {
  display: inline-block;
  will-change: transform, opacity, filter, clip-path;
}

.dc-gradient-text {
  color: #7dd3fc;
}

.dc-hero-lead,
.dc-hero-body {
  max-width: 580px;
}

.dc-hero-lead {
  margin-top: 20px;
  color: #cbd5e1;
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: clamp(16px, 1.5vw, 19px);
  line-height: 1.45;
}

.dc-hero-body {
  margin-top: 16px;
  color: var(--dc-muted);
  font-size: 16px;
  line-height: 1.55;
}

.dc-socials,
.dc-actions {
  flex-wrap: wrap;
  gap: 14px;
}

.dc-socials {
  margin-top: 28px;
}

.dc-icon-btn,
.dc-pill {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: var(--dc-text);
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
}

.dc-icon-btn::after,
.dc-pill::after {
  position: absolute;
  left: var(--press-x, 50%);
  top: var(--press-y, 50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(125, 211, 252, 0.2);
  content: "";
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease;
}

.dc-icon-btn:hover::after,
.dc-pill:hover::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.dc-icon-btn {
  display: inline-grid;
  width: 50px;
  height: 50px;
  place-items: center;
  border-radius: 14px;
}

.dc-icon-btn svg {
  width: 21px;
  height: 21px;
}

.dc-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 700;
}

.dc-pill-primary {
  border-color: transparent;
  background: linear-gradient(140deg, var(--dc-blue), #0ea5e9);
  color: var(--dc-bg);
}

.dc-icon-btn:hover,
.dc-icon-btn:focus-visible,
.dc-pill:hover,
.dc-pill:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(229, 231, 235, 0.56);
  background: rgba(148, 163, 184, 0.08);
}

.dc-icon-btn:active,
.dc-pill:active {
  transform: translateY(0) scale(0.97);
}

.dc-icon-btn > *,
.dc-pill > * {
  position: relative;
  z-index: 1;
}

.dc-pill-primary:hover,
.dc-pill-primary:focus-visible {
  background: linear-gradient(140deg, #7dd3fc, var(--dc-violet));
  color: var(--dc-bg);
}

.dc-hero-orbit {
  display: flex;
  justify-content: center;
}

.dc-orbit-stage {
  position: relative;
  width: clamp(292px, 36vw, 430px);
  aspect-ratio: 1;
}

.dc-ring,
.dc-ring-dashed,
.dc-core-glow,
.dc-avatar-core,
.dc-label-track {
  position: absolute;
  border-radius: 50%;
}

.dc-ring {
  inset: 5%;
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.dc-ring-dashed {
  inset: 21%;
  border: 1px dashed rgba(148, 163, 184, 0.16);
}

.dc-core-glow {
  inset: 26%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.22), rgba(167, 139, 250, 0.12), transparent 72%);
  filter: blur(6px);
}

.dc-avatar-core {
  inset: 26%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: linear-gradient(160deg, var(--dc-panel), #111827);
}

.dc-avatar-frame {
  width: 98%;
  aspect-ratio: 1;
  padding: 3px;
  overflow: hidden;
  border-radius: 50%;
  background: conic-gradient(from 140deg, var(--dc-green), #5eead4, var(--dc-blue), var(--dc-violet), var(--dc-green));
}

.dc-avatar-frame img {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 18%;
  background: #0a0f1a;
  transform: scale(1.16);
}

.dc-label-track {
  inset: 0;
  animation: dc-spin 48s linear infinite;
}

.dc-orbit-label {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
}

.dc-orbit-label span {
  display: block;
  padding: 5px 11px;
  border: 1px solid var(--accent);
  border-radius: 100px;
  background: rgba(15, 23, 42, 0.92);
  color: #cbd5e1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  white-space: nowrap;
  animation: dc-spin-rev 48s linear infinite;
}

.dc-section-head {
  margin-bottom: 40px;
}

.dc-label {
  margin-bottom: 16px;
  color: var(--accent, var(--dc-blue));
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dc-section h2 {
  max-width: 800px;
  margin: 0;
  color: var(--dc-text);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: clamp(40px, 5.8vw, 66px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}

.dc-section p {
  color: var(--dc-muted);
}

.dc-about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.dc-about-card,
.dc-project,
.dc-stack-card,
.dc-timeline-row,
.dc-contact-card {
  border: 1px solid var(--dc-line);
  background: rgba(15, 23, 42, 0.78);
}

.dc-about-card {
  position: relative;
  overflow: hidden;
  min-height: 170px;
  padding: 26px 24px;
  border-radius: 16px;
  transition: transform 240ms ease, border-color 240ms ease;
}

.dc-about-card::before {
  position: absolute;
  inset: -60% auto auto -30%;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.14;
  content: "";
}

.dc-about-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent) 64%, transparent);
}

.dc-about-card small,
.dc-about-card span {
  position: relative;
  z-index: 1;
}

.dc-about-card small {
  display: block;
  color: var(--accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
}

.dc-about-card span {
  display: block;
  margin-top: 9px;
  color: var(--dc-text);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.32;
  white-space: pre-line;
}

.dc-project-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dc-project {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(320px, 1.04fr);
  overflow: hidden;
  border-radius: 18px;
  transform-style: preserve-3d;
  transition: border-color 240ms ease, transform 240ms ease;
}

.dc-project::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    460px circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in srgb, var(--accent) 18%, transparent),
    transparent 66%
  );
  content: "";
  transition: opacity 240ms ease;
}

.dc-project:hover {
  border-color: color-mix(in srgb, var(--accent) 48%, transparent);
}

.dc-project:hover::after {
  opacity: 1;
}

.dc-project-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: clamp(22px, 3vw, 34px);
}

.dc-tags {
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.dc-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 11px;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  border-radius: 100px;
  color: var(--accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}

.dc-tag::before {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  content: "";
  animation: dc-pulse 2.3s ease-in-out infinite;
}

.dc-project h3 {
  margin: 0;
  color: var(--dc-text);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  letter-spacing: -0.025em;
}

.dc-project-sub {
  margin-top: 7px;
  color: var(--accent);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: 15px;
  font-weight: 700;
}

.dc-project-desc {
  margin: 14px 0 0;
  color: var(--dc-muted);
  font-size: 15px;
  line-height: 1.55;
}

.dc-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 16px;
}

.dc-chip {
  padding: 5px 11px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 100px;
  color: var(--dc-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
}

.dc-project-role {
  margin-top: 16px;
  color: var(--dc-soft);
  font-size: 13px;
}

.dc-project-actions {
  gap: 10px;
  margin-top: auto;
  padding-top: 20px;
  flex-wrap: wrap;
}

.dc-project-media {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 340px;
  place-items: center;
  border-left: 1px solid rgba(148, 163, 184, 0.12);
  background: linear-gradient(160deg, #0b1220, var(--dc-panel));
  padding: 26px;
}

.dc-window {
  width: min(100%, 400px);
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  background: #0a0f1a;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), border-color 260ms ease;
  will-change: transform;
}

.dc-project:hover .dc-window {
  border-color: color-mix(in srgb, var(--accent) 42%, rgba(148, 163, 184, 0.2));
  transform: translate3d(0, -5px, 0) scale(1.015);
}

.dc-window-top {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 8px 10px 8px 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  background: #0b1220;
}

.dc-window-app-icon {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  padding: 2px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.16);
  box-shadow: inset 0 0 0 1px rgba(125, 211, 252, 0.22);
}

.dc-window-app-icon span {
  display: block;
  border-radius: 1px;
  background: #60a5fa;
}

.dc-window-title {
  flex: 1;
  overflow: hidden;
  color: var(--accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dc-window-os {
  flex: 0 0 auto;
  padding: 3px 7px;
  border: 1px solid rgba(125, 211, 252, 0.18);
  border-radius: 999px;
  color: #93c5fd;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 9px;
  letter-spacing: 0.04em;
}

.dc-window-controls {
  display: flex;
  align-items: center;
  margin: -8px -10px -8px 0;
  align-self: stretch;
}

.dc-window-control {
  display: grid;
  width: 36px;
  place-items: center;
  color: #94a3b8;
  font-family: "Segoe UI", var(--font-body), system-ui, sans-serif;
  font-size: 13px;
}

.dc-window-control.is-close {
  color: #fca5a5;
}

.dc-window-viewport {
  position: relative;
  overflow: hidden;
  background: #0b1220;
}

.dc-window img {
  display: block;
  width: 100%;
  min-height: 220px;
  object-fit: cover;
  background: #0b1220;
}

.dc-window.is-animated .dc-window-viewport::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(125, 211, 252, 0.08) 44%,
    rgba(125, 211, 252, 0.32) 50%,
    rgba(125, 211, 252, 0.08) 56%,
    transparent 100%
  );
  content: "";
  transform: translateX(-120%);
  animation: dc-scanline 3.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.dc-window.is-animated .dc-window-viewport::after {
  position: absolute;
  left: 16%;
  right: 16%;
  bottom: 11.5%;
  z-index: 2;
  height: 34px;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(125, 211, 252, 0.1), rgba(125, 211, 252, 0.38), rgba(125, 211, 252, 0.1)),
    repeating-linear-gradient(90deg, transparent 0 10px, rgba(125, 211, 252, 0.76) 10px 13px, transparent 13px 20px);
  border-radius: 999px;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.38));
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  animation: dc-wave 1.2s ease-in-out infinite;
}

.dc-stack-wrap {
  overflow: hidden;
  margin-top: 40px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.dc-marquee {
  display: flex;
  width: max-content;
  gap: 14px;
  animation: dc-marquee 34s linear infinite;
}

.dc-marquee + .dc-marquee {
  margin-top: 14px;
  animation-direction: reverse;
  animation-duration: 38s;
}

.dc-stack-pill {
  padding: 11px 22px;
  border: 1px solid var(--dc-line);
  border-radius: 100px;
  color: var(--dc-text);
  font-size: 20px;
  white-space: nowrap;
}

.dc-stack-pill.is-accent {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 52%, transparent);
}

.dc-stack-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 44px;
}

.dc-stack-card {
  padding: 22px;
  border-radius: 16px;
}

.dc-stack-card h3 {
  margin: 0 0 14px;
  color: var(--accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dc-stack-card ul {
  display: grid;
  gap: 9px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.dc-stack-card li {
  color: var(--dc-text);
  font-size: 16px;
  font-weight: 700;
}

.dc-timeline {
  margin-top: 48px;
  border-bottom: 1px solid var(--dc-line);
}

.dc-timeline-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 28px;
  align-items: flex-start;
  padding: 28px 0;
  border-width: 1px 0 0;
  border-color: var(--dc-line);
  background: transparent;
}

.dc-year {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--dc-muted);
  font-size: 22px;
}

.dc-year::before {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: linear-gradient(114deg, var(--dc-green), #abff84);
  content: "";
}

.dc-timeline-row h3 {
  margin: 0;
  color: var(--dc-text);
  font-family: var(--font-display), var(--font-body), sans-serif;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.dc-timeline-row p {
  max-width: 720px;
  margin: 8px 0 0;
  color: var(--dc-muted);
  font-size: 17px;
  line-height: 1.4;
}

.dc-contact-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: clamp(30px, 5vw, 56px);
}

.dc-contact-card::after {
  position: absolute;
  right: -70px;
  top: -80px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.18), transparent 70%);
  content: "";
}

.dc-contact-card h2 {
  position: relative;
  z-index: 1;
  font-size: clamp(40px, 7vw, 92px);
}

.dc-contact-card p,
.dc-contact-card .dc-actions {
  position: relative;
  z-index: 1;
}

.dc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 36px 0 56px;
  border-top: 1px solid var(--dc-line);
  color: var(--dc-soft);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12.5px;
}

@keyframes dc-spin { to { transform: rotate(360deg); } }
@keyframes dc-spin-rev { to { transform: rotate(-360deg); } }
@keyframes dc-float { 50% { transform: translate(24px, -30px); } }
@keyframes dc-float-alt { 50% { transform: translate(-30px, 24px); } }
@keyframes dc-pulse { 50% { opacity: 0.28; } }
@keyframes dc-hue { 50% { background-position: 100% 50%; } }
@keyframes dc-marquee { to { transform: translateX(-50%); } }
@keyframes dc-scanline { 0% { transform: translateX(-120%); } 46%, 100% { transform: translateX(120%); } }
@keyframes dc-wave { 0%, 100% { transform: scaleY(0.72); opacity: 0.62; } 50% { transform: scaleY(1.08); opacity: 1; } }

@media (max-width: 900px) {
  .dc-hero,
  .dc-project {
    grid-template-columns: 1fr;
  }

  .dc-nav-links {
    gap: 14px;
  }

  .dc-nav-links a {
    font-size: 13px;
  }

  .dc-project-media {
    border-left: 0;
    border-top: 1px solid rgba(148, 163, 184, 0.12);
  }

  .dc-orbit-stage {
    width: min(100%, 520px);
  }

  .dc-about-grid,
  .dc-stack-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .dc-about-grid,
  .dc-stack-grid {
    grid-template-columns: 1fr;
  }

  .dc-hero {
    padding-top: 108px;
  }

  .dc-hero h1 {
    font-size: clamp(42px, 15vw, 64px);
  }

  .dc-orbit-stage {
    width: clamp(320px, 88vw, 520px);
  }

  .dc-timeline-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .dc-brand strong {
    display: none;
  }

  .dc-nav {
    gap: 14px;
  }

  .dc-nav-links {
    gap: 10px;
  }

  .dc-nav-links a {
    font-size: 12px;
  }
}

@media (max-width: 430px) {
  .dc-nav-links {
    gap: 8px;
  }

  .dc-nav-links a {
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dc-root *,
  .dc-root *::before,
  .dc-root *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
`;

const orbitLabels = [
  { text: "Local AI", accent: "#38bdf8" },
  { text: "Computer Vision", accent: "#f59e0b" },
  { text: "ML Research", accent: "#a78bfa" },
  { text: "Frontend Systems", accent: "#38bdf8" },
  { text: "Android Releases", accent: "#22c55e" },
  { text: "Open Source", accent: "#a78bfa" },
].map((label, index) => {
  const theta = ((-90 + index * 60) * Math.PI) / 180;
  return {
    ...label,
    x: `${50 + 47 * Math.cos(theta)}%`,
    y: `${50 + 47 * Math.sin(theta)}%`,
  };
});

const aboutCards = [
  {
    label: "Education",
    value: "Bachelor of Technology (Computer Science Engineering)\nJagannath University · 09/2023 – 06/2027",
    accent: "#38bdf8",
  },
  {
    label: "Focus",
    value: "AI, computer vision, ML, and front-end systems",
    accent: "#a78bfa",
  },
  {
    label: "Direction",
    value: "AI tools and Machine learning",
    accent: "#22c55e",
  },
];

const projects = [
  {
    title: "Jarvis Local AI Assistant",
    subtitle: "Windows desktop assistant with local LLM inference and voice control.",
    description:
      "A Windows-first desktop assistant built with Python and PySide6. It uses Ollama for local reasoning, Whisper for speech-to-text, SQLite for memory, and bounded autonomy rules for safer local actions.",
    repository: "https://github.com/Anshuman791322/Ai-agent",
    category: "Desktop AI",
    status: "Active",
    role: "Solo build - design, engineering, local AI workflow",
    tags: ["Python", "PySide6", "Ollama", "Whisper", "SQLite"],
    image: "/projects/ai-agent.svg",
    accent: "#38bdf8",
    animatedPreview: true,
  },
  {
    title: "Smart Driver Monitoring Release Hub",
    subtitle: "Android APK release page for a computer-vision driver-safety system.",
    description:
      "A release and download surface for a Smart Driver Monitoring Dashboard. The project makes an Android computer-vision app easier to distribute, document, and test.",
    repository: "https://github.com/Anshuman791322/smart-driver-monitoring-dashboard-downloads",
    category: "Computer Vision",
    status: "Release Hub",
    role: "Release engineering and public distribution",
    tags: ["Android", "APK", "Computer Vision", "Driver Safety", "Release Eng"],
    image: "/projects/driver-monitoring.svg",
    accent: "#f59e0b",
  },
  {
    title: "Variable Star Classifier",
    subtitle: "Machine-learning notebook for classifying periodic variable stars.",
    description:
      "A Jupyter Notebook project for classifying periodic variable stars from astronomical data. It highlights applied machine learning, feature engineering, and reproducible research workflows.",
    repository: "https://github.com/Anshuman791322/periodically-variable-stars",
    category: "Research",
    status: "Applied ML",
    role: "Research notebook and applied ML",
    tags: ["Python", "Jupyter", "scikit-learn", "Astronomy", "Gaia DR3"],
    image: "/projects/variable-stars.svg",
    accent: "#a78bfa",
  },
  {
    title: "Humanify",
    subtitle: "Rewrites AI-sounding text into natural, human writing.",
    description:
      "A Next.js app that runs a rewrite pipeline over Gemini models: preflight, diagnosis, fact-lock, rewrite, and final quality check. Built privacy-first, with text processed in-request.",
    repository: "https://github.com/Anshuman791322/humanify",
    category: "Web AI",
    status: "Live",
    role: "Solo build - full-stack design and engineering",
    tags: ["Next.js", "TypeScript", "Gemini", "Server Actions", "Privacy-first"],
    image: "/projects/humanify.svg",
    accent: "#2dd4bf",
  },
];

function projectStyle(accent: string) {
  return { "--accent": accent } as React.CSSProperties;
}

const LINKEDIN_URL = "https://www.linkedin.com/in/anshuman-singh-1358031b2/?skipRedirect=true";

export function Portfolio() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const starfieldRef = useRef<HTMLCanvasElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorTrailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = starfieldRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35, active: false };
    const stars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
      alpha: number;
      pulse: number;
    }> = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const createStars = () => {
      stars.length = 0;
      const count = Math.min(150, Math.max(70, Math.round((width * height) / 14500)));
      for (let index = 0; index < count; index += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: Math.random() * 1.9 + 0.55,
          hue: [190, 215, 258, 168][Math.floor(Math.random() * 4)],
          alpha: Math.random() * 0.48 + 0.24,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createStars();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(7, 11, 18, 0.28)";
      context.fillRect(0, 0, width, height);

      const maxDistance = pointer.active ? 132 : 92;

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index];
        const dx = pointer.x - star.x;
        const dy = pointer.y - star.y;
        const distance = Math.hypot(dx, dy);

        if (!media.matches) {
          if (pointer.active && distance < 150) {
            const force = (150 - distance) / 150;
            star.vx -= (dx / Math.max(distance, 1)) * force * 0.018;
            star.vy -= (dy / Math.max(distance, 1)) * force * 0.018;
          }

          star.x += star.vx;
          star.y += star.vy;
          star.vx *= 0.992;
          star.vy *= 0.992;

          if (star.x < -8) star.x = width + 8;
          if (star.x > width + 8) star.x = -8;
          if (star.y < -8) star.y = height + 8;
          if (star.y > height + 8) star.y = -8;
        }

        for (let nextIndex = index + 1; nextIndex < stars.length; nextIndex += 1) {
          const next = stars[nextIndex];
          const lineDistance = Math.hypot(next.x - star.x, next.y - star.y);
          if (lineDistance < maxDistance) {
            const pointerBoost =
              pointer.active && (distance < 190 || Math.hypot(pointer.x - next.x, pointer.y - next.y) < 190)
                ? 1.8
                : 1;
            context.beginPath();
            context.moveTo(star.x, star.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = `rgba(56, 189, 248, ${((1 - lineDistance / maxDistance) * 0.18 * pointerBoost).toFixed(3)})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }

        const glow = pointer.active && distance < 160 ? (160 - distance) / 160 : 0;
        const alpha = star.alpha + Math.sin(time * 0.0014 + star.pulse) * 0.16 + glow * 0.7;
        context.beginPath();
        context.arc(star.x, star.y, star.size + glow * 2.2, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, 90%, ${64 + glow * 18}%, ${Math.min(alpha, 0.95)})`;
        context.shadowColor = `hsla(${star.hue}, 90%, 62%, ${0.5 + glow * 0.4})`;
        context.shadowBlur = 8 + glow * 24;
        context.fill();
        context.shadowBlur = 0;
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const trail = cursorTrailRef.current;
    if (!dot || !trail || !window.matchMedia("(pointer: fine)").matches) return;

    let dotX = window.innerWidth * 0.5;
    let dotY = window.innerHeight * 0.5;
    let trailX = dotX;
    let trailY = dotY;
    let targetX = dotX;
    let targetY = dotY;
    let lastX = dotX;
    let lastY = dotY;
    let frame = 0;

    const show = () => {
      dot.style.opacity = "1";
      trail.style.opacity = "1";
    };

    const hide = () => {
      dot.style.opacity = "0";
      trail.style.opacity = "0";
    };

    const render = () => {
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;
      trailX += (targetX - trailX) * 0.18;
      trailY += (targetY - trailY) * 0.18;

      const angle = Math.atan2(targetY - lastY, targetX - lastX);
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-100%, -50%) rotate(${angle}rad)`;

      lastX += (targetX - lastX) * 0.22;
      lastY += (targetY - lastY) * 0.22;
      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      show();
    };

    const onPointerEnter = show;
    const onPointerLeave = hide;

    const onOver = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button")) {
        dot.classList.add("is-hovering");
      }
    };

    const onOut = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button")) {
        dot.classList.remove("is-hovering");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerenter", onPointerEnter);
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerenter", onPointerEnter);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".dc-project"));
    const controls = Array.from(document.querySelectorAll<HTMLElement>(".dc-icon-btn, .dc-pill"));

    const cardCleanups = cards.map((card) => {
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      };
      card.addEventListener("pointermove", onMove, { passive: true });
      return () => card.removeEventListener("pointermove", onMove);
    });

    const controlCleanups = controls.map((control) => {
      const onMove = (event: PointerEvent) => {
        const rect = control.getBoundingClientRect();
        control.style.setProperty("--press-x", `${event.clientX - rect.left}px`);
        control.style.setProperty("--press-y", `${event.clientY - rect.top}px`);
      };
      control.addEventListener("pointermove", onMove, { passive: true });
      return () => control.removeEventListener("pointermove", onMove);
    });

    return () => {
      cardCleanups.forEach((cleanup) => cleanup());
      controlCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const hash = window.location.hash.replace("#", "");
      if (hash) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ block: "start" });
        }, 120);
      }

      gsap.from(".dc-nav", {
        y: -24,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".dc-hero-word", {
          yPercent: 90,
          opacity: 0,
          filter: "blur(10px)",
          clipPath: "inset(0 0 100% 0)",
          duration: 0.78,
          stagger: 0.09,
        })
        .from(
          [".dc-hero-lead", ".dc-hero-body"],
          {
            y: 24,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.58,
            stagger: 0.08,
          },
          "-=0.34",
        )
        .from(
          ".dc-socials > *",
          {
            y: 14,
            opacity: 0,
            scale: 0.94,
            duration: 0.38,
            stagger: 0.05,
          },
          "-=0.18",
        );

      gsap.from(".dc-orbit-stage", {
        scale: 0.82,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        delay: 0.16,
      });

      gsap.utils.toArray<HTMLElement>(".dc-reveal").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
          y: 44,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".dc-project").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
          },
          y: 50,
          scale: 0.985,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        });
      });

      gsap.to(".dc-window", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".dc-project-list",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".dc-count").forEach((count) => {
        const value = Number(count.dataset.value || "0");
        gsap.fromTo(
          count,
          { textContent: 0 },
          {
            textContent: value,
            duration: 1.1,
            snap: { textContent: 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: count,
              start: "top 86%",
            },
          },
        );
      });

      const nav = root.querySelector<HTMLElement>(".dc-nav-links");
      const indicator = root.querySelector<HTMLElement>(".dc-nav-indicator");
      const links = gsap.utils.toArray<HTMLAnchorElement>(".dc-nav-links a");
      const moveIndicator = (link: HTMLAnchorElement | undefined) => {
        if (!nav || !indicator || !link) return;
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        gsap.to(indicator, {
          x: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
          duration: 0.28,
          ease: "power3.out",
        });
      };

      const navCleanups = links.map((link) => {
        const onEnter = () => moveIndicator(link);
        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("focus", onEnter);
        return () => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("focus", onEnter);
        };
      });

      ["about", "projects", "stack", "contact"].forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            const link = links.find((item) => item.getAttribute("href") === `#${id}`);
            link?.classList.toggle("is-active", self.isActive);
            if (self.isActive) moveIndicator(link);
          },
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });

      return () => {
        navCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef },
  );

  return (
    <>
      <style>{STYLES}</style>
      <div className="dc-root" id="top" ref={rootRef}>
        <canvas className="dc-starfield" ref={starfieldRef} aria-hidden="true" />
        <div className="dc-cursor-trail" ref={cursorTrailRef} aria-hidden="true" />
        <div className="dc-cursor-dot" ref={cursorDotRef} aria-hidden="true" />
        <div className="dc-progress" ref={progressRef} />

        <nav className="dc-nav" aria-label="Primary">
          <a className="dc-brand" href="#top" aria-label="Anshuman Singh home">
            <span className="dc-logo">AS</span>
            <strong>Anshuman Singh</strong>
          </a>
          <div className="dc-nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
            <span className="dc-nav-indicator" aria-hidden="true" />
          </div>
        </nav>

        <main>
          <section className="dc-shell dc-hero" aria-labelledby="hero-title">
            <div className="dc-orb dc-orb-one" />
            <div className="dc-orb dc-orb-two" />
            <div className="dc-hero-copy">
              <h1 id="hero-title">
                <span className="dc-hero-word">Anshuman</span>{" "}
                <span className="dc-hero-word dc-gradient-text">Singh</span>
              </h1>
              <p className="dc-hero-lead">
                B.Tech Computer Science student focused on local-first AI,
                computer-vision systems, applied machine learning, and polished
                front-end interfaces.
              </p>
              <p className="dc-hero-body">
                I turn academic and personal projects into usable software:
                desktop assistants with local inference, Android release pages
                for computer-vision apps, reproducible ML notebooks, and
                portfolio systems that are fast, visual, and open source.
              </p>
              <div className="dc-socials">
                <a className="dc-icon-btn" href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github aria-hidden="true" strokeWidth={2.2} />
                </a>
                <a className="dc-icon-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin aria-hidden="true" strokeWidth={2.2} />
                </a>
                <a className="dc-icon-btn" href="mailto:anshuman6062@gmail.com" aria-label="Email">
                  <Mail aria-hidden="true" strokeWidth={2.2} />
                </a>
                <a className="dc-pill dc-pill-primary" href="#projects">
                  View Projects <span>→</span>
                </a>
              </div>
            </div>

            <div className="dc-hero-orbit" aria-hidden="true">
              <div className="dc-orbit-stage">
                <div className="dc-ring" />
                <div className="dc-ring-dashed" />
                <div className="dc-core-glow" />
                <div className="dc-avatar-core">
                  <div className="dc-avatar-frame">
                    <Image src="/avatar-cut.png" alt="" width={420} height={420} priority />
                  </div>
                </div>
                <div className="dc-label-track">
                  {orbitLabels.map((label) => (
                    <div
                      className="dc-orbit-label"
                      key={label.text}
                      style={{ "--x": label.x, "--y": label.y, "--accent": label.accent } as React.CSSProperties}
                    >
                      <span>{label.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="dc-shell dc-section" id="about" aria-labelledby="about-title">
            <div className="dc-section-head dc-reveal" style={projectStyle("#38bdf8")}>
              <h2 id="about-title">
                About <span className="dc-gradient-text">Me</span>
              </h2>
            </div>
            <div className="dc-about-grid">
              {aboutCards.map((card) => (
                <article className="dc-about-card dc-reveal" key={card.label} style={projectStyle(card.accent)}>
                  <small>{card.label}</small>
                  <span>{card.value}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="dc-shell dc-section" id="projects" aria-labelledby="projects-title">
            <div className="dc-section-head dc-reveal" style={projectStyle("#a78bfa")}>
              <h2 id="projects-title">Projects</h2>
            </div>
            <div className="dc-project-list">
              {projects.map((project) => (
                <article className="dc-project" key={project.title} style={projectStyle(project.accent)}>
                  <div className="dc-project-copy">
                    <div className="dc-tags">
                      <span className="dc-tag">{project.status}</span>
                      <span className="dc-chip">{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <div className="dc-project-sub">{project.subtitle}</div>
                    <p className="dc-project-desc">{project.description}</p>
                    <div className="dc-chip-list">
                      {project.tags.map((tag) => (
                        <span className="dc-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="dc-project-role">
                      <span>Role:</span> {project.role}
                    </div>
                    <div className="dc-project-actions">
                      <a className="dc-pill" href={project.repository} target="_blank" rel="noreferrer">
                        GitHub <span>↗</span>
                      </a>
                    </div>
                  </div>
                  <div className="dc-project-media">
                    <div
                      className={`dc-window ${project.animatedPreview ? "is-animated" : ""}`}
                      role="img"
                      aria-label={`${project.title} visual preview`}
                    >
                      <div className="dc-window-top">
                        <span className="dc-window-app-icon" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                          <span />
                        </span>
                        <span className="dc-window-title">{project.title}</span>
                        <span className="dc-window-os">Windows</span>
                        <span className="dc-window-controls" aria-hidden="true">
                          <span className="dc-window-control">−</span>
                          <span className="dc-window-control">□</span>
                          <span className="dc-window-control is-close">×</span>
                        </span>
                      </div>
                      <div className="dc-window-viewport">
                        <Image src={project.image} alt="" width={800} height={480} />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="dc-shell dc-section" id="stack" aria-labelledby="stack-title">
            <div className="dc-section-head dc-reveal" style={projectStyle("#22c55e")}>
              <h2 id="stack-title">Stack I use to build, test, and ship</h2>
              <p className="dc-hero-body">
                Tools behind the public repos: local models, native desktop UI,
                static front-end delivery, and release packaging.
              </p>
            </div>
            <div className="dc-stack-grid">
              {portfolio.skills.map((group, index) => (
                <article className="dc-stack-card dc-reveal" key={group.label} style={projectStyle(["#38bdf8", "#22c55e", "#a78bfa", "#f59e0b"][index % 4])}>
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="dc-shell dc-section" id="contact" aria-labelledby="contact-title">
            <div className="dc-contact-card dc-reveal">
              <h2 id="contact-title">
                Have a project, role, or collaboration in mind?
              </h2>
              <p className="dc-hero-body">
                I am open to software roles, internships, collaborations, and
                product engineering work where the implementation has to survive
                real use.
              </p>
              <div className="dc-actions">
                <a className="dc-pill dc-pill-primary" href={`mailto:${portfolio.person.email}`}>
                  Email Me <span>→</span>
                </a>
                <a className="dc-pill" href={portfolio.person.github} target="_blank" rel="noreferrer">
                  GitHub <span>↗</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="dc-shell dc-footer">
          <span>© 2026 Anshuman Singh - built in public</span>
          <span>local-first AI - computer vision - web</span>
        </footer>
      </div>
    </>
  );
}
