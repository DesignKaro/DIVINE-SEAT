import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy  - Divine Lotus",
  description:
    "Learn how Divine Lotus collects, uses, and protects your personal information with full transparency and data privacy rights.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Divine Lotus",
    description:
      "Learn how Divine Lotus collects, uses, and protects your personal information with full transparency and data privacy rights.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
