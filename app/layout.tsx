import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PlaceholderLinks } from "@/components/motion/PlaceholderLinks";
import { MotionRoot } from "@/components/motion/MotionRoot";
import "./globals.css";

// Newsreader Light with its optical-size axis (opsz 6–72), latin subset, from Google Fonts (OFL).
// The static Google cut is opsz 16 and renders ~5% narrower than Figma, which uses auto optical
// sizing; with the axis, the browser's default `font-optical-sizing: auto` matches Figma.
const newsreader = localFont({
  src: "./fonts/newsreader-opsz-light-latin.woff2",
  weight: "300",
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
  // Metric-matched serif fallback (default is Arial) → no reflow when the webfont swaps in.
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

// Self-hosted at build time by next/font (font-display: swap, preloaded).
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

// Test deploys (GitHub Pages) must never be indexed: NEXT_PUBLIC_NOINDEX=1 → <meta name="robots" content="noindex, nofollow">.
const noIndex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const metadata: Metadata = {
  ...(noIndex && { robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } } }),
  title: "Gruppo Benefind — Servizi IT e tecnologie per le aziende",
  description:
    "Benefind - Digital Innovation Group: servizi IT, tecnologie abilitanti e soluzioni su misura per la trasformazione digitale delle aziende.",
};

export const viewport: Viewport = {
  themeColor: "#0c0a68",
};

/*
 * Runs before first paint: marks JS as available so motion "hidden" states (scoped to .js in
 * styles/motion.css) apply only when scripts run. If the motion layer has not booted within 4s
 * (bundle failed), .motion-fallback forces everything visible. Server HTML is always fully visible.
 */
const bootScript = `(function(d){d.classList.remove('no-js');d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.add('motion-fallback')},4000)})(document.documentElement)`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`no-js ${newsreader.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Vai al contenuto
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionRoot />
        <PlaceholderLinks />
      </body>
    </html>
  );
}
