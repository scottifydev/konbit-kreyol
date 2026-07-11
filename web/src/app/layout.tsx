import type { Metadata } from "next";
import {
  Anton,
  Literata,
  Fraunces,
  IBM_Plex_Mono,
  Libre_Caslon_Display,
} from "next/font/google";
import "./globals.css";

/** DRAPO GINEN type spine (05-art-direction-drapo-ginen.md §4), self-hosted.
 *  Anton = display/English chrome; Literata = the Kreyòl reading body;
 *  Fraunces = ceremonial subhead; Plex Mono = cipher; Caslon = French artifact. */
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--f-display", display: "swap" });
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${literata.variable} ${fraunces.variable} ${mono.variable} ${caslon.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
