import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedivinelotus.org";

export const metadata: Metadata = {
  title: "Contact Concierge & Studio Support",
  description:
    "Reach our private concierge desk for bespoke seat commissions, studio batch orders, ergonomic posture consultations, or order care.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Concierge | Divine Lotus",
    description:
      "Reach our private concierge desk for bespoke seat commissions, studio batch orders, ergonomic posture consultations, or order care.",
    url: "/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${siteUrl}/contact#webpage`,
      url: `${siteUrl}/contact`,
      name: "Contact Concierge & Studio Support | Divine Lotus",
      description:
        "Reach our private concierge desk for bespoke seat commissions, studio batch orders, ergonomic posture consultations, or order care.",
      mainEntity: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Divine Lotus",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "theedivinelotuss@gmail.com",
          availableLanguage: ["English"],
        },
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
            name: "Contact",
            item: `${siteUrl}/contact`,
          },
        ],
      },
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={contactSchema} />
      {children}
    </>
  );
}
