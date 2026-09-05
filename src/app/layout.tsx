import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import CookieBanner from "@/components/CookieBanner";
import RecaptchaProvider from "@/components/RecaptchaProvider";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedivinelotus.org";

export const viewport: Viewport = {
  themeColor: "#ECE7DE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Divine Lotus  - Architectural Ergonomic Meditation Seat",
    template: "%s | Divine Lotus",
  },
  description:
    "Thoughtfully designed seat for deeper meditation, natural alignment, and a calmer mind. Rooted in the wisdom of ancient asanas like Siddhasana and Padmasana, and handcrafted with natural materials for the way we sit today.",
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
      { url: "/favicon-48.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon-48.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "The Divine Lotus - Where Ancient Wisdom Meets Modern Comfort",
    description:
      "Thoughtfully designed seat for deeper meditation, natural alignment, and a calmer mind. Rooted in the wisdom of ancient asanas like Siddhasana and Padmasana, and handcrafted with natural materials for the way we sit today.",
    url: siteUrl,
    siteName: "Divine Lotus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Lotus Seat  - Where Ancient Wisdom Meets Modern Comfort",
      },
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "The Lotus Seat  - Where Ancient Wisdom Meets Modern Comfort",
      },
      {
        url: "/images/ancient_wisdom_modern_comfort.avif",
        width: 1200,
        height: 800,
        type: "image/avif",
        alt: "The Lotus Seat  - Ancient Wisdom × Modern Comfort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Divine Lotus - Where Ancient Wisdom Meets Modern Comfort",
    description:
      "Thoughtfully designed seat for deeper meditation, natural alignment, and a calmer mind. Rooted in the wisdom of ancient asanas like Siddhasana and Padmasana, and handcrafted with natural materials for the way we sit today.",
    images: ["/og-image.png"],
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
      legalName: "Divine Lotus Sanctuary",
      url: siteUrl,
      slogan: "Where ancient wisdom meets modern comfort.",
      description:
        "Architectural mindfulness design bridging ancient yogic biomechanics with contemporary ergonomic engineering.",
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/lotus-favicon.png`,
        caption: "Divine Lotus Emblem",
      },
      image: `${siteUrl}/images/ancient_wisdom_modern_comfort.avif`,
      sameAs: [
        "https://www.instagram.com/divinelotus",
        "https://www.youtube.com/@divinelotus",
        "https://twitter.com/divinelotus",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "theedivinelotuss@gmail.com",
          contactType: "customer service",
          availableLanguage: ["English"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        },
      ],
      knowsAbout: [
        "Meditation Ergonomics",
        "Spinal Posture Alignment",
        "Botanical Natural Latex Craft",
        "Sustainable Portuguese Cork",
        "Mindful Living Furniture",
      ],
    },
    {
      "@type": "Brand",
      "@id": `${siteUrl}/#brand`,
      name: "Divine Lotus",
      url: siteUrl,
      logo: `${siteUrl}/lotus-favicon.png`,
      slogan: "Where ancient wisdom meets modern comfort.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Divine Lotus",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/#pricing?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
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
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZSSGEY2MH8"
        />
        <script
          id="google-tag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZSSGEY2MH8');
            `,
          }}
        />
        <link rel="preload" href="/fonts/Glacier.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/hero_bg_poster.avif" as="image" type="image/avif" fetchPriority="high" />
        <link rel="icon" href="/favicon-48.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon-48.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <JsonLd data={organizationSchema} />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#F6F3ED] text-[#402E1D] font-sans antialiased selection:bg-[#876540]/20 selection:text-[#402E1D]">
        {children}
        <CookieBanner />
        <RecaptchaProvider />
      </body>
    </html>
  );
}
