import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie & Tracking Notice  - Divine Lotus",
  description:
    "Review our Cookie & Tracking Notice covering essential functionality, Google Analytics, Meta Pixel advertising technologies, and your privacy choices.",
  alternates: {
    canonical: "/cookie-policy",
  },
  openGraph: {
    title: "Cookie & Tracking Notice | Divine Lotus",
    description:
      "Review our Cookie & Tracking Notice covering essential functionality, Google Analytics, Meta Pixel advertising technologies, and your privacy choices.",
    url: "/cookie-policy",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
