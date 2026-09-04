import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions  - Divine Lotus",
  description:
    "Review the official Terms & Conditions for Divine Lotus, covering product information, ordering, batch production, meditation and wellness guidance, intellectual property, and governing law.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Divine Lotus",
    description:
      "Review the official Terms & Conditions for Divine Lotus, covering product information, ordering, batch production, meditation and wellness guidance, intellectual property, and governing law.",
    url: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
