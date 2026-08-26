import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Divine Lotus collects, manages, and protects your personal information with full GDPR and CCPA compliance.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Divine Lotus",
    description:
      "Learn how Divine Lotus collects, manages, and protects your personal information with full GDPR and CCPA compliance.",
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
