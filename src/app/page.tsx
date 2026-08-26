import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutFoundationSection from "@/components/AboutFoundationSection";
import ProblemsSection from "@/components/ProblemsSection";
import SolutionSection from "@/components/SolutionSection";
import RealThingSection from "@/components/RealThingSection";
import PricingSection from "@/components/PricingSection";
import BiomechanicalBenefitsSection from "@/components/BiomechanicalBenefitsSection";
import BiomechanicalChainSection from "@/components/BiomechanicalChainSection";
import AncientWisdomSection from "@/components/AncientWisdomSection";
import ComparisonSection from "@/components/ComparisonSection";
import TheAnswerSection from "@/components/TheAnswerSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://divinelotus.com";

const homeSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${siteUrl}/#product`,
      name: "The Lotus Seat",
      image: [
        `${siteUrl}/images/seat-stack.webp`,
        `${siteUrl}/images/seat-profile.webp`,
        `${siteUrl}/images/about_seat_lifestyle_v4.avif`,
      ],
      description:
        "Architectural ergonomic meditation seat handcrafted with Portuguese cork, natural botanical latex core, and removable organic linen cover.",
      brand: {
        "@type": "Brand",
        name: "Divine Lotus",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "249",
        highPrice: "349",
        offerCount: "3",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: "Divine Lotus",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.95",
        reviewCount: "128",
      },
    },
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
      <AboutFoundationSection />
      <ProblemsSection />
      <SolutionSection />
      <RealThingSection />
      <PricingSection />
      <BiomechanicalBenefitsSection />
      <BiomechanicalChainSection />
      <AncientWisdomSection />
      <ComparisonSection />
      <TheAnswerSection />
      <Footer />
    </main>
  );
}
