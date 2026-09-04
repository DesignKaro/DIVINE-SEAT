import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedivinelotus.org";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy  - Divine Lotus",
  description:
    "Review the Divine Lotus Returns & Refunds Policy: 30-day change-of-mind returns, customized orders, return shipping, and refund processes.",
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: "Returns & Refunds Policy | Divine Lotus",
    description:
      "Review the Divine Lotus Returns & Refunds Policy: 30-day change-of-mind returns, customized orders, return shipping, and refund processes.",
    url: "/refund-policy",
  },
};

const refundPolicySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/refund-policy#webpage`,
      url: `${siteUrl}/refund-policy`,
      name: "Returns & Refunds Policy  - Divine Lotus",
      description: "Review the Divine Lotus Returns & Refunds Policy.",
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
            name: "Refund Policy",
            item: `${siteUrl}/refund-policy`,
          },
        ],
      },
    },
    {
      "@type": "MerchantReturnPolicy",
      "@id": `${siteUrl}/refund-policy#policy`,
      name: "Divine Lotus 30-Day Sitting Trial Guarantee",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
      url: `${siteUrl}/refund-policy`,
    },
  ],
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={refundPolicySchema} />
      {children}
    </>
  );
}
