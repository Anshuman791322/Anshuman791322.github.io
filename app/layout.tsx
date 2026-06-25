import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anshuman Singh — AI · Computer Vision · Web",
  description:
    "B.Tech Computer Science student building practical AI, computer-vision, and web products. Local-first desktop AI, Android release engineering, applied ML notebooks, and polished portfolio systems.",
  metadataBase: new URL("https://anshuman791322.github.io"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Anshuman Singh — Selected works",
    description:
      "Local-first AI, computer vision, applied research, and considered front-end.",
    url: "https://anshuman791322.github.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body style={{ margin: 0, background: "#070B12" }}>{children}</body>
    </html>
  );
}
