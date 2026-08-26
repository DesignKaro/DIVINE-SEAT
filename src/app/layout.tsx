import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import JsonLd from "@/components/JsonLd";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://divinelotus.com";

export const viewport: Viewport = {
  themeColor: "#ECE7DE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Divine Lotus — Architectural Ergonomic Meditation Seat",
    template: "%s | Divine Lotus",
  },
  description:
    "Where ancient wisdom meets modern comfort. Handcrafted Portuguese cork foundation and botanical latex cushion for effortless spinal alignment and pain-free meditation sitting.",
  applicationName: "Divine Lotus",
  keywords: [
    "meditation seat",
    "the divine lotus",
    "divine lotus",
    "ergonomic meditation cushion",
    "cork posture base",
    "botanical latex cushion",
    "spinal alignment seat",
    "luxury meditation chair",
    "floor meditation furniture",
    "mindful living design",
  ],
  authors: [{ name: "Divine Lotus Sanctuary", url: siteUrl }],
  creator: "Divine Lotus",
  publisher: "Divine Lotus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/lotus-favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/lotus-favicon.png"],
    apple: [
      { url: "/lotus-favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Divine Lotus — Architectural Ergonomic Meditation Seat",
    description:
      "Where ancient wisdom meets modern comfort. Handcrafted Portuguese cork foundation and botanical latex cushion for effortless spinal alignment and pain-free meditation.",
    url: siteUrl,
    siteName: "Divine Lotus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/lotus-favicon.png",
        width: 512,
        height: 512,
        alt: "Divine Lotus Golden Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine Lotus — Architectural Ergonomic Meditation Seat",
    description:
      "Where ancient wisdom meets modern comfort. Handcrafted Portuguese cork foundation and botanical latex cushion for effortless spinal alignment.",
    images: ["/lotus-favicon.png"],
    creator: "@divinelotus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Divine Lotus",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/lotus-favicon.png`,
        caption: "Divine Lotus",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "care@divinelotus.com",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Divine Lotus",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/lotus-favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/lotus-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/lotus-favicon.png" />
        <JsonLd data={organizationSchema} />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#F6F3ED] text-[#402E1D] font-sans antialiased selection:bg-[#876540]/20 selection:text-[#402E1D]">
        {children}
      </body>
    </html>
  );
}
