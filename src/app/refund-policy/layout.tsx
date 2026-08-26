import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "30-Day Practice Trial & Refund Policy",
  description:
    "Explore our risk-free 30-day practice trial, zero restocking fees, prepaid return courier labels, and warranty claim procedures.",
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: "Refund & Return Policy | Divine Lotus",
    description:
      "Explore our risk-free 30-day practice trial, zero restocking fees, prepaid return courier labels, and warranty claim procedures.",
    url: "/refund-policy",
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
