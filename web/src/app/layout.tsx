import type { Metadata } from "next";
import {
  Archivo_Black,
  Literata,
  Fraunces,
  IBM_Plex_Mono,
  Libre_Caslon_Display,
} from "next/font/google";
import "./globals.css";

/** DRAPO GINEN type spine (05-art-direction-drapo-ginen.md §4), self-hosted.
 *  Archivo Black = loud poster display/English chrome (renders è/ò/à — the
 *  Kreyòl-diacritic-safe poster face); Literata = the Kreyòl reading body;
 *  Fraunces = ceremonial subhead; Plex Mono = cipher; Caslon = French artifact. */
const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--f-display", display: "swap" });
const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-body",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-cere",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--f-mono",
  display: "swap",
});
const caslon = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--f-french",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kòd La",
  description: "Two brothers, one wire the enemy cannot read.",
  openGraph: {
    title: "Kòd La",
    description: "Two brothers, one wire the enemy cannot read.",
    type: "website",
    images: ["/art/gate-ground.webp"],
  },
};

export const viewport = { themeColor: "#0d0a07" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${literata.variable} ${fraunces.variable} ${mono.variable} ${caslon.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
