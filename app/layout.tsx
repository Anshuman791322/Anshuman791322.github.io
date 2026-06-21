import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

// Self-hosted Fontshare fonts — Gambetta (display serif) + General Sans (body).
// Dark Academia voice on the display; modern clarity on the UI.
const gambetta = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/gambetta-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/gambetta-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/gambetta-600.woff2", weight: "600", style: "normal" },
  ],
});

const generalSans = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../public/fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/general-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/general-sans-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Anshuman Singh — Computer-science engineer & product builder",
  description:
    "Selected works of Anshuman Singh: local-first AI, computer vision, applied research and considered front-end. Five public products on GitHub.",
  metadataBase: new URL("https://anshuman791322.github.io"),
  openGraph: {
    title: "Anshuman Singh — Selected works",
    description:
      "Local-first AI, computer vision, applied research and considered front-end.",
    url: "https://anshuman791322.github.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${generalSans.variable} ${gambetta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
