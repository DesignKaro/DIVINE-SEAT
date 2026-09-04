import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedivinelotus.org";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy  - Divine Lotus",
  description:
    "Learn about Divine Lotus shipping coverage, production batch timelines, international customs and duties, tracking, and transit damage procedures.",
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    title: "Shipping & Delivery Policy | Divine Lotus",
    description:
      "Learn about Divine Lotus shipping coverage, production batch timelines, international customs and duties, tracking, and transit damage procedures.",
    url: "/shipping-policy",
  },
};

const shippingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/shipping-policy#webpage`,
      url: `${siteUrl}/shipping-policy`,
      name: "Shipping & Delivery Policy  - Divine Lotus",
      description: "Learn about Divine Lotus worldwide shipping coverage and timelines.",
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
            name: "Shipping Policy",
            item: `${siteUrl}/shipping-policy`,
          },
        ],
      },
    },
  ],
};

export default function ShippingPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={shippingSchema} />
      {children}
    </>
  );
}
