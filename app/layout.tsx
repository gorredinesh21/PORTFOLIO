import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { profile } from "@/lib/data";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  metadataBase: new URL("https://gorredinesh21.dev"),
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="crt-overlay" />
        <div className="scanline" />
        <Nav />
        <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 py-10 sm:py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
