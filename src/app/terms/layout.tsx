import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review our terms of sale, 3-year structural warranty, natural materials notice, and small-batch production reservation policies.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Divine Lotus",
    description:
      "Review our terms of sale, 3-year structural warranty, natural materials notice, and small-batch production reservation policies.",
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
