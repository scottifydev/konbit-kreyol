import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Working title (owner decision 2026-07-10), pending Manman's pass like
  // every Kreyòl string; the kid-facing logo falls back to English until
  // certified — see chrome("logo").
  title: "Kòd La",
  description: "Two brothers, one rope.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Runtime font load — no build-time network dependency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Instrument+Sans:wght@400;600;700&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
