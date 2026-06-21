import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

// Self-hosted Fontshare pair: Cabinet Grotesk for display, Satoshi for UI/body.
const cabinetGrotesk = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/cabinet-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/cabinet-grotesk-700.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/cabinet-grotesk-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/cabinet-grotesk-800.woff2", weight: "800", style: "normal" },
  ],
});

const satoshi = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../public/fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/satoshi-700.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/satoshi-700.woff2", weight: "700", style: "normal" },
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
    <html lang="en" className={`${satoshi.variable} ${cabinetGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
