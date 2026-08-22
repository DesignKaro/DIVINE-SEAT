import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Divine Lotus — Architectural Ergonomic Meditation Seat | Divine Lotus",
  description:
    "Where ancient wisdom meets modern comfort. The Divine Lotus supports a naturally upright posture and makes longer periods of meditation effortless.",
  keywords: [
    "meditation seat",
    "the divine lotus",
    "divine lotus",
    "ergonomic cushion",
    "natural latex meditation",
    "cork posture base",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-[#F6F3ED] text-[#402E1D] font-sans antialiased selection:bg-[#876540]/20 selection:text-[#402E1D]">
        {children}
      </body>
    </html>
  );
}
