import dynamic from "next/dynamic";
import Image from "next/image";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutFoundationSection from "@/components/AboutFoundationSection";

// Dynamically load below-the-fold sections for optimized initial JavaScript execution & TBT
const ProblemsSection = dynamic(() => import("@/components/ProblemsSection"));
const SolutionSection = dynamic(() => import("@/components/SolutionSection"));
const RealThingSection = dynamic(() => import("@/components/RealThingSection"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const AncientWisdomSection = dynamic(() => import("@/components/AncientWisdomSection"));
const BiomechanicalChainSection = dynamic(() => import("@/components/BiomechanicalChainSection"));
const ComparisonSection = dynamic(() => import("@/components/ComparisonSection"));
const TheAnswerSection = dynamic(() => import("@/components/TheAnswerSection"));
const Footer = dynamic(() => import("@/components/Footer"));
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedivinelotus.org";

const homeSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Core WebPage & Voice Search Speakable Specification
    {
      "@type": "ItemPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "The Lotus Seat  - Architectural Ergonomic Meditation Seat",
      description:
        "Where ancient wisdom meets modern comfort. Handcrafted Portuguese cork foundation and botanical latex cushion for effortless spinal alignment and pain-free meditation sitting.",
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/about_seat_lifestyle_v7.avif`,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "The Lotus Seat",
            item: `${siteUrl}/#pricing`,
          },
        ],
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".hero-subtitle"],
      },
    },

    // 2. Comprehensive Google Merchant & Rich Results Product Schema
    {
      "@type": "Product",
      "@id": `${siteUrl}/#product`,
      name: "The Lotus Seat",
      alternateName: "Divine Lotus Meditation Seat",
      description:
        "An architectural ergonomic meditation seat crafted with a Portuguese cork composite base and responsive natural botanical latex core to support upright pelvic alignment and eliminate sitting fatigue.",
      category: "Furniture > Chairs > Meditation Seats",
      sku: "LOTUS-SEAT-001",
      mpn: "DS-LOTUS-V1",
      image: [
        `${siteUrl}/images/about_seat_lifestyle_v7.avif`,
        `${siteUrl}/images/ancient_wisdom_modern_comfort.avif`,
        `${siteUrl}/images/materials/01-cork.avif`,
        `${siteUrl}/images/materials/02-latex.avif`,
        `${siteUrl}/images/materials/03-cotton.avif`,
      ],
      brand: {
        "@type": "Brand",
        "@id": `${siteUrl}/#brand`,
        name: "Divine Lotus",
      },
      manufacturer: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
      },
      material: "Portuguese Cork Composite, 100% Botanical Natural Latex, Breathable Organic Linen-Cotton",
      color: "Alabaster Linen, Sand Crema, Dual-Tone Slate Mist",
      itemCondition: "https://schema.org/NewCondition",
      height: "18 cm",
      width: "48 cm",
      depth: "36 cm",
      weight: "2.4 kg",
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Forward Pelvic Inclination",
          value: "8.5 degrees",
        },
        {
          "@type": "PropertyValue",
          name: "Cushion Core",
          value: "Botanical Natural Latex (zero polyurethane)",
        },
        {
          "@type": "PropertyValue",
          name: "Cover System",
          value: "Removable & Machine Washable with Concealed YKK Zipper",
        },
        {
          "@type": "PropertyValue",
          name: "Included Practice Bonus",
          value: "Free Meditation Mat + Sadhana Practice Guide",
        },
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "149",
        highPrice: "199",
        offerCount: "2",
        offers: [
          {
            "@type": "Offer",
            "@id": `${siteUrl}/#offer-standard`,
            name: "The Lotus Seat (Standard Signature Edition)",
            sku: "LOTUS-STD-149",
            price: "149.00",
            priceCurrency: "EUR",
            priceValidUntil: "2027-12-31",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/#pricing`,
            seller: {
              "@type": "Organization",
              name: "Divine Lotus",
            },
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "0.00",
                currency: "EUR",
              },
              shippingDestination: [
                {
                  "@type": "DefinedRegion",
                  addressCountry: ["FR", "DE", "ES", "IT", "NL", "BE", "GB", "US"],
                },
              ],
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 2,
                  unitCode: "d",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 3,
                  maxValue: 6,
                  unitCode: "d",
                },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
              returnPolicyCountry: ["FR", "DE", "ES", "IT", "NL", "BE", "GB", "US"],
              url: `${siteUrl}/refund-policy`,
            },
          },
          {
            "@type": "Offer",
            "@id": `${siteUrl}/#offer-custom`,
            name: "The Lotus Seat  - Custom Artisanal Edition",
            sku: "LOTUS-CUST-199",
            price: "199.00",
            priceCurrency: "EUR",
            priceValidUntil: "2027-12-31",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/#pricing`,
            seller: {
              "@type": "Organization",
              name: "Divine Lotus",
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
              url: `${siteUrl}/refund-policy`,
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.95",
        reviewCount: "128",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "Dr. Elena Vance",
          },
          datePublished: "2026-06-14",
          reviewBody:
            "As a physiotherapist and meditator for 15 years, the subtle forward pelvic inclination changes everything. Eliminates lumbar strain without pushing the spine into hyperextension.",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
        {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "Marcus Thorne",
          },
          datePublished: "2026-07-22",
          reviewBody:
            "Zero numbness in 45-minute sits. The natural latex cushion has an active resilience that regular meditation cushions completely lack.",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
      ],
    },

    // 3. Video Object Schema for Hero Background
    {
      "@type": "VideoObject",
      "@id": `${siteUrl}/#hero-video`,
      name: "The Divine Lotus Seat  - Architectural Mindfulness in Motion",
      description:
        "Cinematic glimpse of the Lotus Seat in a quiet evening sanctuary, highlighting botanical latex and Portuguese cork craftsmanship.",
      thumbnailUrl: [`${siteUrl}/hero_bg_poster.avif`],
      uploadDate: "2026-08-31T10:00:00+00:00",
      contentUrl: `${siteUrl}/videos/hero_bg_video.mp4`,
      embedUrl: siteUrl,
      duration: "PT8.5S",
    },

    // 4. FAQPage Schema for Search Rich Snippets
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes the dual-layer material unique?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike memory foam that compresses flat or hard wood benches, our responsive botanical latex cushion absorbs sit-bone pressure with active rebound, anchored by a high-density renewable cork foundation.",
          },
        },
        {
          "@type": "Question",
          name: "How does it prevent tailbone ache and numbness?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The anatomical center relief groove provides zero-contact suspension for your tailbone, while contoured side slopes cradle the thighs to prevent nerve compression and numbness during extended practice.",
          },
        },
        {
          "@type": "Question",
          name: "Which sitting postures work best with the Divine Seat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Engineered for versatile comfort across Half Lotus (Ardha Padmasana), Full Lotus (Padmasana), Easy Cross-Legged (Sukhasana), Seiza kneeling, and Burmese postures across all heights and flexibility levels.",
          },
        },
        {
          "@type": "Question",
          name: "How does it support effortless upright posture?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "By elevating your hips above knee level with a calibrated contour, it naturally tilts the pelvis forward to prevent lumbar rounding and release tension from the lower back and neck muscles.",
          },
        },
        {
          "@type": "Question",
          name: "How do I care for and clean the seat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The outer cover is woven from breathable organic linen with a concealed YKK zipper, easily removable for gentle machine washing. The antimicrobial cork base wipes clean with a damp cloth.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F6F3ED] overflow-x-clip">
      <JsonLd data={homeSchemas} />
      <Header />
      <HeroSection />

      {/* Unified Continuous Flowing Background for all sections up to Features */}
      <div className="relative w-full bg-[#E6DFD4] overflow-hidden">
        {/* Full-Height Continuous Ambient Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/flowing-light-bg.avif"
            alt="Background ambiance"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Warm overlay for legibility and brand consistency - reduced opacity for rich visual presence */}
          <div className="absolute inset-0 bg-[#E6DFD4]/40" />
        </div>

        {/* Continuous Flowing Sacred Mandala Motifs (Unbroken across the whole scroll journey) */}
        <div className="absolute left-0 top-[18%] -translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>
        <div className="absolute right-0 top-[52%] translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>
        <div className="absolute left-0 top-[82%] -translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>

        {/* Sections sharing the continuous flowing background */}
        <AboutFoundationSection />
        <ProblemsSection />
        <SolutionSection />
      </div>

      <RealThingSection />

      {/* Unified Continuous Flowing Background from Pricing all the way through FAQs */}
      <div className="relative w-full bg-[#E6DFD4] overflow-hidden">
        {/* Full-Height Continuous Ambient Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/flowing-light-bg.avif"
            alt="Background ambiance"
            fill
            priority={false}
            unoptimized
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Warm overlay for legibility and brand consistency */}
          <div className="absolute inset-0 bg-[#E6DFD4]/40" />
        </div>

        {/* Continuous Flowing Sacred Mandala Motifs */}
        <div className="absolute left-0 top-[12%] -translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>
        <div className="absolute right-0 top-[35%] translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>
        <div className="absolute left-0 top-[60%] -translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>
        <div className="absolute right-0 top-[84%] translate-x-1/3 -translate-y-1/2 w-[180px] sm:w-[240px] lg:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.10] mix-blend-multiply">
          <Image src="/images/about.avif" alt="" fill unoptimized sizes="(max-width: 1024px) 25vw, 18vw" className="object-contain" />
        </div>

        {/* Sections sharing the continuous flowing background */}
        <PricingSection />
        <AncientWisdomSection />
        <BiomechanicalChainSection />
        <ComparisonSection />
        <TheAnswerSection />
        <Footer />
      </div>
    </main>
  );
}
