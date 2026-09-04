import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product, Meditation & Wellness Disclaimer  - Divine Lotus",
  description:
    "Review our Product, Meditation & Wellness Disclaimer regarding ergonomic design, non-medical nature, individual variations, and yogic educational content.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Product, Meditation & Wellness Disclaimer | Divine Lotus",
    description:
      "Review our Product, Meditation & Wellness Disclaimer regarding ergonomic design, non-medical nature, individual variations, and yogic educational content.",
    url: "/disclaimer",
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
